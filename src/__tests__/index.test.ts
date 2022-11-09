/** ****************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Tue Oct 25 2022
 *  File : index.test.ts
 ****************************************** */
import getVideoWatermarkFree, { Video } from '..';

jest.spyOn(global, 'fetch').mockImplementation(
    jest.fn((url) => {
        if (url === 'https://tikfast.net/en') {
            return Promise.resolve({
                headers: {
                    get: () => 'cookie',
                },
            });
        }
        if (url === 'https://tikfast.net/tik-download/download-link') {
            return Promise.resolve({
                json: () => {
                    return Promise.resolve({
                        status: 'ok',
                        code: 200,
                        data: [
                            {
                                water_free_link:
                                    'hgfhdgfdhgfdhgfdhgfdhgfdhgfdhg',
                                description: 'test',
                            },
                        ],
                    });
                },
            });
        }
        if (url === 'https://tikfast.net/tik-download/download') {
            return Promise.resolve({
                json: () => {
                    return Promise.resolve({
                        status: 'ok',
                        code: 200,
                        data: [
                            {
                                url: 'https://tikfast.net/download/1234567890',
                                vid: '1234567890',
                            },
                        ],
                    });
                },
            });
        }
        return Promise.resolve({});
    }) as jest.Mock,
);

beforeEach(() => {
    jest.clearAllMocks();
});

test('getVideoWatermarkFree', async () => {
    const url = 'https://www.tiktok.com/@steuerfabi/video/7158115322103352582';
    return getVideoWatermarkFree(url).then((video: Video) => {
        expect(video).toBeDefined();
        expect(video.url).toBeDefined();
        expect(video.url).toBe('https://tikfast.net/download/1234567890');
        expect(video.vid).toBeDefined();
        expect(video.vid).toBe('1234567890');
        expect(video.description).toBeDefined();
        expect(video.description).toBe('test');
    });
});

test('getVideoWatermarkFree', async () => {
    const url = 'https://www.tiktok.com/@steuerfabi/video/7158115322103352582';
    const video = getVideoWatermarkFree(url);
    expect(video).toBeInstanceOf(Promise<Video>);
});
