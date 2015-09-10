(function(){

  function ShakeIcon(){
    this.animationEnable = true;
    this.style = document.createElement('style');
    this.style.textContent = `
      @keyframes shakeIcon {
        0% {background-position: 0px 0px;}
        2% {background-position: -0.5px 0.5px;}
        4% {background-position: -2.5px -1.5px;}
        6% {background-position: 1.5px 1.5px;}
        8% {background-position: -1.5px -2.5px;}
        10% {background-position: 1.5px 1.5px;}
        12% {background-position: -1.5px 1.5px;}
        14% {background-position: -1.5px 0.5px;}
        16% {background-position: 0.5px 0.5px;}
        18% {background-position: 0.5px -2.5px;}
        20% {background-position: -2.5px 0.5px;}
        22% {background-position: 1.5px 0.5px;}
        24% {background-position: -0.5px -1.5px;}
        26% {background-position: -1.5px 1.5px;}
        28% {background-position: -1.5px -0.5px;}
        30% {background-position: -2.5px 0.5px;}
        32% {background-position: 1.5px -0.5px;}
        34% {background-position: 0.5px -2.5px;}
        36% {background-position: 0.5px -2.5px;}
        38% {background-position: -2.5px -0.5px;}
        40% {background-position: -0.5px 1.5px;}
        42% {background-position: 1.5px 1.5px;}
        44% {background-position: -2.5px -2.5px;}
        46% {background-position: 0.5px -2.5px;}
        48% {background-position: -0.5px -2.5px;}
        50% {background-position: -0.5px 0.5px;}
        52% {background-position: 1.5px 0.5px;}
        54% {background-position: -2.5px 0.5px;}
        56% {background-position: -2.5px 1.5px;}
        58% {background-position: -2.5px -2.5px;}
        60% {background-position: -0.5px -2.5px;}
        62% {background-position: -1.5px 0.5px;}
        64% {background-position: -1.5px -0.5px;}
        66% {background-position: -2.5px 0.5px;}
        68% {background-position: -1.5px -0.5px;}
        70% {background-position: 0.5px 1.5px;}
        72% {background-position: -2.5px 1.5px;}
        74% {background-position: 1.5px -0.5px;}
        76% {background-position: -0.5px -1.5px;}
        78% {background-position: -0.5px -2.5px;}
        80% {background-position: 1.5px -0.5px;}
        82% {background-position: -1.5px 0.5px;}
        84% {background-position: -1.5px -1.5px;}
        86% {background-position: 0.5px -0.5px;}
        88% {background-position: -2.5px -2.5px;}
        90% {background-position: -1.5px 1.5px;}
        92% {background-position: -1.5px 0.5px;}
        94% {background-position: -1.5px -0.5px;}
        96% {background-position: 1.5px 0.5px;}
        98% {background-position: -0.5px -1.5px;}
      }

      @keyframes shakeBtn {
        0% {transform: translate(0px, 0px) rotate(0deg);}
        10% {transform: translate(1.5px, 1.5px) rotate(-0.5deg);}
        20% {transform: translate(-2.5px, 0.5px) rotate(-1.5deg);}
        30% {transform: translate(-2.5px, 0.5px) rotate(0.5deg);}
        40% {transform: translate(-0.5px, 1.5px) rotate(0.5deg);}
        50% {transform: translate(-0.5px, 0.5px) rotate(0.5deg);}
        60% {transform: translate(-0.5px, -2.5px) rotate(-0.5deg);}
        70% {transform: translate(0.5px, 1.5px) rotate(0.5deg);}
        80% {transform: translate(1.5px, -0.5px) rotate(0.5deg);}
        90% {transform: translate(-1.5px, 1.5px) rotate(0.5deg);}
        100% {transform: translate(-0.5px, -1.5px) rotate(0.5deg);}
      }

      .edit-mode .icon[data-identifier^=http],
      .edit-mode .icon[data-identifier^=http] .remove,
      .edit-mode .icon[data-identifier^=http] .title {
        animation-duration: 100ms;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
        animation-delay: 0s;
        animation-play-state: running;
      }

      .edit-mode .icon[data-identifier^=http] {
        animation-name: shakeIcon;
      }

      .edit-mode .icon[data-identifier^=http] .remove,
      .edit-mode .icon[data-identifier^=http] .title {
        animation-name: shakeBtn;
      }
    `;

    document.body.appendChild(this.style);
    navigator.mozApps.mgmt.addEventListener('enabledstatechange', this);
    navigator.mozApps.mgmt.addEventListener('uninstall', this);
  }

  ShakeIcon.prototype.handleEvent = function(e) {
    switch(e.type) {
      case 'enabledstatechange':
        if (e.application.enabled) {
          if(!this.animationEnable) {
            document.body.appendChild(this.style);
            this.animationEnable = true;
          }
        } else {
          document.body.removeChild(this.style);
          this.animationEnable = false;
        }
        break;
      case 'uninstall':
        document.body.removeChild(this.style);
        this.animationEnable = false;
        navigator.mozApps.mgmt.removeEventListener('enabledstatechange', this);
        navigator.mozApps.mgmt.removeEventListener('uninstall', this);
        break;
    }
  };

  if (document.readyState !== 'loading') {
    new ShakeIcon();
  } else {
    document.addEventListener('readystatechange',
      function readyStateChange() {
        if (document.readyState === 'interactive') {
          document.removeEventListener('readystatechange',
            readyStateChange);
          new ShakeIcon();
        }
      });
  }
})();