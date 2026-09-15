"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export type CloudShaderProps = {
  className?: string;
  children?: React.ReactNode;
  speed?: number;
  count?: number;
  cloudColor?: string;
  skyTopColor?: string;
  skyBottomColor?: string;
};

const VERT = `attribute vec2 a_pos; varying vec2 v_uv; void main(){v_uv=a_pos*.5+.5;gl_Position=vec4(a_pos,0.,1.);}`;
const FRAG = `precision highp float; varying vec2 v_uv; uniform vec2 u_res; uniform float u_time; uniform float u_count; uniform vec3 u_cloud,u_skyTop,u_skyBottom;
float hash(vec2 p){return fract(sin(dot(p,vec2(41.31,289.17)))*26737.367);} float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);} float fbm(vec2 p){float s=0.,a=.5;for(int i=0;i<4;i++){s+=a*noise(p);p=p*2.03+19.19;a*=.5;}return s;} 
float cloud(vec2 p,vec2 c,vec2 r,float seed){vec2 q=p-c;float ry=q.y>0.?r.y:r.y*.42;float e=1.-length(vec2(q.x/r.x,q.y/ry));if(e<-.35)return 0.;vec2 d=q*(2.4/r.x)+seed;d+=.6*vec2(fbm(d*1.4+u_time*.04),fbm(d*1.4+7.7-u_time*.03));float b=0.,a=.5;for(int i=0;i<5;i++){b+=a*(1.-abs(2.*noise(d)-1.));d=d*2.11+13.37;a*=.5;}return e+(b-.62)*.62;}
vec3 pass(vec3 col,vec2 p,float asp,float phase,float y,vec2 r,float seed,float depth,float drift){float x=mix(-r.x-.25,asp+r.x+.25,fract(u_time*drift+phase));vec2 c=vec2(x,y+sin(u_time*.05+phase*6.28)*.012);float d=cloud(p,c,r,seed);if(d<.02)return col;float up=cloud(p+vec2(0.,r.y*.55),c,r,seed);float occ=clamp((up-d)*1.1+d*.55,0.,1.);vec3 sky=mix(u_skyBottom,u_skyTop,p.y);vec3 ccol=mix(u_cloud*1.04,mix(u_cloud*.6,sky,.38),occ*.85);float al=smoothstep(.02,.38,d)*mix(1.,.8,depth);return mix(col,ccol,al);}
void main(){float asp=u_res.x/u_res.y;vec2 p=vec2(v_uv.x*asp,v_uv.y);vec3 sky=mix(u_skyBottom,u_skyTop,v_uv.y);vec3 col=sky;col=mix(col,u_skyBottom*1.06,smoothstep(.35,0.,v_uv.y)*.5);vec2 sun=vec2(asp*.78,.92);col+=vec3(1.,.95,.82)*exp(-length(p-sun)*length(p-sun)*5.)*.28;if(u_count>5.5)col=pass(col,p,asp,.1,.84,vec2(.2,.1),43.7,1.,.006);if(u_count>4.5)col=pass(col,p,asp,.62,.73,vec2(.24,.12),71.3,.85,.008);if(u_count>3.5)col=pass(col,p,asp,.33,.6,vec2(.34,.16),17.3,.55,.011);if(u_count>2.5)col=pass(col,p,asp,.8,.47,vec2(.3,.15),29.9,.45,.013);if(u_count>1.5)col=pass(col,p,asp,.05,.35,vec2(.46,.2),91.1,.15,.016);col=pass(col,p,asp,.48,.2,vec2(.56,.24),57.2,0.,.02);gl_FragColor=vec4(col,1.);}`;

function parseHex(color: string): [number, number, number] { const value=color.trim().replace("#", ""); if(value.length===3)return [parseInt(value[0]+value[0],16)/255,parseInt(value[1]+value[1],16)/255,parseInt(value[2]+value[2],16)/255]; const rgb=value.match(/[\d.]+/g); if(rgb&&rgb.length>=3)return [Number(rgb[0])/255,Number(rgb[1])/255,Number(rgb[2])/255]; return [1,1,1]; }
function compile(gl: WebGLRenderingContext,type:number,source:string){const shader=gl.createShader(type);if(!shader)return null;gl.shaderSource(shader,source);gl.compileShader(shader);if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){gl.deleteShader(shader);return null;}return shader;}

export const CloudShader = ({ className, children, speed=1, count=6, cloudColor="#fbf8f2", skyTopColor="#3876ba", skyBottomColor="#8cbfe8" }: CloudShaderProps) => {
  const canvasRef=useRef<HTMLCanvasElement>(null); const params=useRef({speed,count,cloudColor,skyTopColor,skyBottomColor});
  useEffect(() => { params.current={speed,count,cloudColor,skyTopColor,skyBottomColor}; }, [speed,count,cloudColor,skyTopColor,skyBottomColor]);
  useEffect(()=>{const canvas=canvasRef.current;if(!canvas)return;const gl=canvas.getContext("webgl",{alpha:false,antialias:false});if(!gl)return;const vert=compile(gl,gl.VERTEX_SHADER,VERT),frag=compile(gl,gl.FRAGMENT_SHADER,FRAG);if(!vert||!frag)return;const program=gl.createProgram();if(!program)return;gl.attachShader(program,vert);gl.attachShader(program,frag);gl.bindAttribLocation(program,0,"a_pos");gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))return;gl.useProgram(program);const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0);const loc={res:gl.getUniformLocation(program,"u_res"),time:gl.getUniformLocation(program,"u_time"),count:gl.getUniformLocation(program,"u_count"),cloud:gl.getUniformLocation(program,"u_cloud"),top:gl.getUniformLocation(program,"u_skyTop"),bottom:gl.getUniformLocation(program,"u_skyBottom")};const resize=()=>{const dpr=Math.min(devicePixelRatio||1,2),w=Math.max(1,Math.floor(canvas.clientWidth*dpr)),h=Math.max(1,Math.floor(canvas.clientHeight*dpr));if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}gl.viewport(0,0,w,h);gl.uniform2f(loc.res,w,h);};const observer=new ResizeObserver(resize);observer.observe(canvas);resize();let frame=0,running=true;const start=performance.now();const draw=(now:number)=>{if(!running)return;const p=params.current;const c=parseHex(p.cloudColor),top=parseHex(p.skyTopColor),bottom=parseHex(p.skyBottomColor);gl.uniform1f(loc.time,((now-start)/1000)*p.speed);gl.uniform1f(loc.count,Math.min(6,Math.max(1,p.count)));gl.uniform3f(loc.cloud,c[0],c[1],c[2]);gl.uniform3f(loc.top,top[0],top[1],top[2]);gl.uniform3f(loc.bottom,bottom[0],bottom[1],bottom[2]);gl.drawArrays(gl.TRIANGLES,0,3);frame=requestAnimationFrame(draw);};frame=requestAnimationFrame(draw);return()=>{running=false;cancelAnimationFrame(frame);observer.disconnect();gl.deleteBuffer(buffer);gl.deleteProgram(program);gl.deleteShader(vert);gl.deleteShader(frag);};},[]);
  return <div className={cn("relative h-full min-h-80 w-full overflow-hidden",className)}><canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />{children?<div className="relative z-10 flex h-full w-full items-center justify-center">{children}</div>:null}</div>;
};
