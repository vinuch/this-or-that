(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[99],{3135:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/polls/[pid]",function(){return n(5108)}])},5108:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return x}});var s=n(4051),o=n.n(s),r=n(5893),i=n(1163),a=n(7294),c=n(5182),l=function(e){var t=e.time,n=new Date(Number(t)).getTime(),s=(0,a.useState)({days:0,hours:0,minutes:0,seconds:0}),o=s[0],i=s[1],c=function(){var e=(new Date).getTime(),t=n-e,s=Math.floor(t/864e5),o=Math.floor(t%864e5/36e5),r=Math.floor(t%36e5/6e4),a=Math.floor(t%6e4/1e3);i(s<0&&o<0&&r<0&&a<0?{days:0,hours:0,minutes:0,seconds:0}:{days:s,hours:o,minutes:r,seconds:a})};return a.useEffect((function(){if(n){var e=setInterval((function(){return c()}),1e3);return function(){return clearInterval(e)}}}),[n,c]),(0,r.jsx)("div",{className:"pt-4",children:(0,r.jsxs)("p",{className:"text-secondary text-center text-2xl font-bold",children:["Poll closes in : ","".concat(o.days,"d ").concat(o.hours,"h ").concat(o.minutes,"m ").concat(o.seconds,"s")]})})},d=n(8963),u=n(782),v=n(3854);function m(e,t,n,s,o,r,i){try{var a=e[r](i),c=a.value}catch(l){return void n(l)}a.done?t(c):Promise.resolve(c).then(s,o)}function x(){var e,t=(0,i.useRouter)(),n=(0,d.b)(),s=n.account,x=n.contract,f=(0,a.useState)(!1),h=f[0],p=f[1],j=(0,a.useState)(!1),g=j[0],y=j[1],b=(0,a.useState)(!1),w=b[0],N=b[1],k=(0,a.useState)(!1),q=k[0],_=k[1],E=(0,a.useState)(),T=E[0],S=E[1],C=(0,a.useCallback)((e=o().mark((function e(){var n;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,p(!0),e.next=4,null===x||void 0===x?void 0:x.getPoll({id:t.query.pid});case 4:n=e.sent,S(n),(null===n||void 0===n?void 0:n.participants.includes(s.accountId))&&_(!0),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.log({error:e.t0});case 12:return e.prev=12,p(!1),e.finish(12);case 15:case"end":return e.stop()}}),e,null,[[0,9,12,15]])})),function(){var t=this,n=arguments;return new Promise((function(s,o){var r=e.apply(t,n);function i(e){m(r,s,o,i,a,"next",e)}function a(e){m(r,s,o,i,a,"throw",e)}i(void 0)}))}),[t.query,s.accountId,x]);(0,a.useEffect)((function(){C()}),[t.query]);var I=(0,a.useState)(null),M=I[0],O=I[1],P=(new Date).getTime()>Number(null===T||void 0===T?void 0:T.deadline);return(0,r.jsxs)(c.Z,{children:[P?(0,r.jsx)("p",{className:"text-xl font-bold text-red-600 text-center",children:"This poll is expired !! "}):(0,r.jsx)(l,{time:(null===T||void 0===T?void 0:T.deadline)||""}),(0,r.jsxs)("main",{className:"flex justify-between items-center h-full",style:{height:"85vh"},children:[(0,r.jsxs)("div",{className:"bg-primaryLight overflow-hidden rounded-md h-4/6 w-4/12 cursor-pointer ".concat(M==(null===T||void 0===T?void 0:T.contestants.indexOf(null===T||void 0===T?void 0:T.contestants[0]))?"border border-8 border-secondary":""),onClick:function(){return!P&&!q&&O(0)},children:[(0,r.jsx)("div",{className:"h-5/6 flex justify-center items-center ",children:(null===T||void 0===T?void 0:T.contestants[0].img)&&!g?(0,r.jsx)("img",{src:(null===T||void 0===T?void 0:T.contestants[0].img)||"/question-mark.png",alt:"question mark",onError:function(){return y(!0)},className:"object-cover w-full h-full"}):(0,r.jsx)("img",{src:"/question-mark.png",alt:"question mark",className:"w-64 h-64"})}),(0,r.jsxs)("p",{className:"text-center font-bold text-lg mt-4",children:[" ",null===T||void 0===T?void 0:T.contestants[0].votes," Votes"]})]}),(0,r.jsxs)("div",{className:"text-center w-3/12",children:[(0,r.jsxs)("div",{className:"font-extrabold text-5xl -mt-32 break-words",children:[" ",(0,r.jsx)("p",{className:"".concat(M==(null===T||void 0===T?void 0:T.contestants.indexOf(null===T||void 0===T?void 0:T.contestants[0]))?"text-secondary":""),children:null===T||void 0===T?void 0:T.contestants[0].name}),"  ",(0,r.jsx)("p",{className:"text-lg text-secondary my-6",children:"vs"})," ",(0,r.jsx)("p",{className:"".concat(M==(null===T||void 0===T?void 0:T.contestants.indexOf(null===T||void 0===T?void 0:T.contestants[1]))?"text-secondary":""),children:null===T||void 0===T?void 0:T.contestants[1].name})]}),(0,r.jsx)("p",{className:"text-xl font-light mt-16",children:null===T||void 0===T?void 0:T.prompt}),(0,r.jsx)("p",{className:"text-xs mt-6",children:"(click to choose)"})]}),(0,r.jsxs)("div",{className:"bg-primaryLight rounded-md h-4/6 w-4/12 cursor-pointer ".concat(M==(null===T||void 0===T?void 0:T.contestants.indexOf(null===T||void 0===T?void 0:T.contestants[1]))?"border border-8 border-secondary":""),onClick:function(){return!P&&!q&&O(1)},children:[(0,r.jsx)("div",{className:"h-5/6 flex justify-center items-center ",children:(null===T||void 0===T?void 0:T.contestants[1].img)&&!w?(0,r.jsx)("img",{src:(null===T||void 0===T?void 0:T.contestants[1].img)||"/question-mark.png",alt:"question mark",onError:function(){return N(!0)},className:"object-cover w-full h-full"}):(0,r.jsx)("img",{src:"/question-mark.png",alt:"question mark",className:"rotate-180 w-64 h-64"})}),(0,r.jsxs)("p",{className:"text-center font-bold text-lg mt-4",children:[" ",null===T||void 0===T?void 0:T.contestants[1].votes," Votes"]})]})]}),q&&!P?(0,r.jsx)("p",{className:"text-xl font-bold text-center",children:"Looks like you voted already!"}):!P&&(0,r.jsx)("div",{className:"flex justify-center",children:(0,r.jsx)("button",{disabled:null==M||h,className:"px-24 py-3 rounded-md disabled:cursor-not-allowed disabled:opacity-50 bg-secondary ",onClick:function(){p(!0),x.vote({pollId:t.query.pid,contestantIndex:String(M)}).then((function(){(0,u.Am)((0,r.jsx)(v.RT,{text:"Vote added successfully."})),p(!1),C()})).catch((function(e){p(!1),console.log(e),(0,u.Am)((0,r.jsx)(v.ZN,{text:"Failed to add vote"}))}))},children:h?(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",style:{margin:"auto",background:"transparent",display:"block"},width:"30px",height:"30px",viewBox:"0 0 100 100",preserveAspectRatio:"xMidYMid",children:(0,r.jsx)("circle",{cx:"50",cy:"50",r:"32",strokeWidth:"8",stroke:"#85a2b6",strokeDasharray:"50.26548245743669 50.26548245743669",fill:"none",strokeLinecap:"round",children:(0,r.jsx)("animateTransform",{attributeName:"transform",type:"rotate",repeatCount:"indefinite",dur:"1s",keyTimes:"0;1",values:"0 50 50;360 50 50"})})}):"Vote"})})]})}}},function(e){e.O(0,[16,182,774,888,179],(function(){return t=3135,e(e.s=t);var t}));var t=e.O();_N_E=t}]);