/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Tue Oct 25 2022
 *  File : example.ts
 *******************************************/

import getVideoWatermarkFree from './';

const url = 'https://www.tiktok.com/@steuerfabi/video/7158115322103352582';

(async () => {
    const video = await getVideoWatermarkFree(url);
    console.log(video);
})();
