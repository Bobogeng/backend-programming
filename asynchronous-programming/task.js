const showDownload = (download) => {
    return new Promise((resolve, reject) => {
        console.log("Download Selesai");
        resolve(`Hasil Download: ${download}`);
    });
};

const download = async (download) => {
    console.log(await showDownload(download));
};

download("windows-10.exe");
