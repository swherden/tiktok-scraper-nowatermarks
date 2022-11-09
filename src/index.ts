/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Mon Oct 24 2022
 *******************************************/

export default async function getVideoWatermarkFree(
    videoUrl: string,
): Promise<Video> {
    return new Promise((resolve, reject) => {
        if (!videoUrl || videoUrl.length === 0) {
            reject(new Error('No video URL provided'));
        }
        fetch('https://tikfast.net/en')
            .then((mainResponse) => {
                const cookie = mainResponse.headers.get('set-cookie');
                if (cookie) {
                    fetch('https://tikfast.net/tik-download/download-link', {
                        headers: {
                            accept: 'application/json, text/javascript, */*; q=0.01',
                            'accept-language':
                                'de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7',
                            'content-type': 'application/json',
                            'sec-ch-ua':
                                '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"',
                            'sec-ch-ua-mobile': '?0',
                            'sec-ch-ua-platform': '"macOS"',
                            'sec-fetch-dest': 'empty',
                            'sec-fetch-mode': 'cors',
                            'sec-fetch-site': 'same-origin',
                            'x-requested-with': 'XMLHttpRequest',
                            cookie,
                            Referer: 'https://tikfast.net/en',
                            'Referrer-Policy':
                                'strict-origin-when-cross-origin',
                        },
                        body: `{"0": "${videoUrl}"}`,
                        method: 'POST',
                    })
                        .then((downloadLinkResponse) =>
                            downloadLinkResponse.json(),
                        )
                        .then((downloadLinkJson) => {
                            if (
                                downloadLinkJson.status === 'ok' &&
                                downloadLinkJson.code === 200 &&
                                downloadLinkJson.data &&
                                downloadLinkJson.data.length > 0
                            ) {
                                const data = downloadLinkJson.data;
                                for (const dataItem of data) {
                                    const link = dataItem.water_free_link;
                                    fetch(
                                        'https://tikfast.net/tik-download/download',
                                        {
                                            headers: {
                                                accept: 'application/json, text/javascript, */*; q=0.01',
                                                'accept-language':
                                                    'de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7',
                                                'content-type':
                                                    'application/json',
                                                'sec-ch-ua':
                                                    '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"',
                                                'sec-ch-ua-mobile': '?0',
                                                'sec-ch-ua-platform': '"macOS"',
                                                'sec-fetch-dest': 'empty',
                                                'sec-fetch-mode': 'cors',
                                                'sec-fetch-site': 'same-origin',
                                                'x-requested-with':
                                                    'XMLHttpRequest',
                                                cookie,
                                                Referer:
                                                    'https://tikfast.net/en',
                                                'Referrer-Policy':
                                                    'strict-origin-when-cross-origin',
                                            },
                                            body: `{"url": "${link}"}`,
                                            method: 'POST',
                                        },
                                    )
                                        .then((downloadResponse) =>
                                            downloadResponse.json(),
                                        )
                                        .then((downloadJson) => {
                                            if (
                                                downloadJson.status === 'ok' &&
                                                downloadJson.code === 200 &&
                                                downloadJson.data &&
                                                downloadJson.data.length > 0
                                            ) {
                                                const responseData =
                                                    downloadJson.data[0];
                                                if (responseData) {
                                                    responseData.description =
                                                        downloadLinkJson.data[0].description;
                                                    responseData.cover_url =
                                                        downloadLinkJson.data[0].cover_url;
                                                    resolve(responseData);
                                                } else {
                                                    reject(
                                                        new Error(
                                                            '[Fetching download] No data found',
                                                        ),
                                                    );
                                                }
                                            } else {
                                                reject(
                                                    new Error(
                                                        '[Fetching download] error',
                                                    ),
                                                );
                                            }
                                        })
                                        .catch((err) => reject(err));
                                }
                            } else {
                                reject(
                                    new Error('[Fetching download-link] error'),
                                );
                            }
                        })
                        .catch((err) => reject(err));
                } else {
                    reject(new Error('No cookie found'));
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
}

export interface Video {
    url: string;
    description: string;
    vid: string;
    cover_url: string;
}
