/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Tue Oct 25 2022
 *  File : index.test.ts
 *******************************************/
import getVideoWatermarkFree, { Video } from '../';

test('getVideoWatermarkFree', async () => {
    const url = 'https://www.tiktok.com/@steuerfabi/video/7158115322103352582';
    return getVideoWatermarkFree(url).then((video: Video) => {
        expect(video).toBeDefined();
        expect(video.url).toBeDefined();
        expect(video.vid).toBeDefined();
        expect(video.description).toBeDefined();
        expect;
    });
});

test('getVideoWatermarkFree', async () => {
    const url = 'https://www.tiktok.com/@steuerfabi/video/7158115322103352582';
    const video = await getVideoWatermarkFree(url);
    expect(video).toBeInstanceOf(Promise<Video>);
});
