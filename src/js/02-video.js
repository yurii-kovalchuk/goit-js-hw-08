import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframeRef = document.querySelector('#vimeo-player');
const player = new Player(iframeRef);

player.on(
  'timeupdate',
  throttle(
    data => localStorage.setItem('videoplayer-current-time', data.seconds),
    1000
  )
);

if (localStorage.getItem('videoplayer-current-time')) {
  player
    .setCurrentTime(localStorage.getItem('videoplayer-current-time'))
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          console.log(
            'the time was less than 0 or greater than the video’s duration'
          );
          break;

        default:
          console.log('some error');
          break;
      }
    });
}
