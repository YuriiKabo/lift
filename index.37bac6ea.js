const t={body:document.querySelector("body"),floors:document.querySelector(".floors"),lift:document.querySelector("[lift]"),btnCall:document.querySelectorAll(".button__call"),liftBtn:document.querySelectorAll(".lift-button"),tabNum:document.querySelectorAll(".tab__quad-num"),doors:document.querySelectorAll(".outdoor")};let e=0,o=1;function l(l){if("BUTTON"===l.target.nodeName){const u=parseInt(t.lift.style.top);let i=parseInt(t.lift.style.top);switch(l.target.id){case"f1":case"f-1-btn":i=844;break;case"f2":case"f-2-btn":i=644;break;case"f3":case"f-3-btn":i=444;break;case"f4":case"f-4-btn":i=244;break;case"f5":case"f-5-btn":i=44}"lift-button"===l.target.className&&(c(),e=2e3),setTimeout((()=>{!function(e,l,c){if(l>c){const t="1";a(e,l,c,t),n(l,c,t)}else if(l<c){const t="-1";a(e,l,c,t),n(l,c,t)}else l===c&&(s(e),setTimeout((()=>{f(e)}),500),function(e){r();for(let o=0;o<t.tabNum.length;o+=1)if(0===o){t.doors.forEach((t=>{const o=e;t.id===`d${o}`&&t.classList.toggle("outdoor-open")}));break}}(o))}(l,u,i)}),e),s(l),"button__call"===l.target.className&&(l.target.style.backgroundColor="#88ff3e")}}function n(e,l,n){const a=setInterval((()=>{var r;844>(e=e-`${n}`)&&744<e?o=1:744>e&&544<e?o=2:544>e&&344<e?o=3:344>e&&144<e?o=4:144>e&&44<e&&(o=5),e===l&&clearInterval(a),r=o,t.tabNum.forEach((t=>{t.textContent=r}))}),7)}function a(l,n,a,s){const u=setInterval((()=>{n=n-`${s}`,t.lift.style.top=`${n}px`,n===a&&(!function(e){r();for(let o=0;o<t.tabNum.length;o+=1)if(0===o){t.doors.forEach((t=>{const o=e;t.id===`d${o}`&&t.classList.add("outdoor-open")}));break}}(o),clearInterval(u),"button__call"===l.target.className&&function(){const t=Date.now(),o=setInterval((()=>{const l=Date.now()-6e3;e=t-l,e=100*parseInt(e/100),0===e&&clearInterval(o)}),100)}(),f(l),setTimeout((()=>{e=0,c()}),4e3))}),7)}function r(){setTimeout((()=>{c()}),4e3)}function c(){t.doors.forEach((t=>{t.classList.remove("outdoor-open")}))}function s(e){e.target.style.backgroundColor="#3f86ff",e.target.style.color="#ffffff",t.lift.removeEventListener("click",l),t.btnCall.forEach((t=>{t.disabled=!0,t.style.backgroundColor="#ff3535"}))}function f(e){e.target.style.backgroundColor="#efefef",e.target.style.color="#000000",t.lift.addEventListener("click",l),t.btnCall.forEach((t=>{t.disabled=!1,t.style.backgroundColor="#efefef"}))}t.body.addEventListener("click",l);
//# sourceMappingURL=index.37bac6ea.js.map
