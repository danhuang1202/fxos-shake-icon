const SETTING_MANIFEST_URL = 'app://settings.gaiamobile.org/manifest.webapp';
const SETTING_QUERY_SELECTOR = `.icon[data-identifier="${SETTING_MANIFEST_URL}"]`;

var style = document.createElement('style');
style.textContent = `
  @keyframes thumb {
    0% { transform: scale(1); }
    50% { transform: scale(0.9); }
    100% { transform: scale(1); }
  }
`;
document.body.appendChild(style);

var wrap = document.createElement('div');
wrap.style = 'height: 0; overflow: hidden;';

var icon = document.querySelector(SETTING_QUERY_SELECTOR);
var bg = icon.dataset.backgroundImage;

var dom = document.createElement('div');
dom.id = 'dan';
dom.style = `
  width:130px;
  height:120px;
  border-radius: 50%;
  background-color: rgba(3, 3, 3, 1);
  animation-name: thumb;
  animation-duration: 200ms;
  transform-origin:50% 50%;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  background-attachment: scroll;
  background-clip: border-box;
  background-color: transparent;
  background-image: url("${bg}");
  background-origin: padding-box;
  background-position: 50% 0%;
  background-repeat: no-repeat;
  background-size: 98px auto;
`;

wrap.appendChild(dom);
document.body.appendChild(wrap);

icon.style.backgroundImage ='-moz-element(#dan)';