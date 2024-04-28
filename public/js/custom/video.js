
function openModal(videoUrl) {
    document.getElementById('videoFrame').src = videoUrl;
    var myModal = new bootstrap.Modal(document.getElementById('videoModal'));
    myModal.show();
}

var videoModal = document.getElementById('videoModal');
videoModal.addEventListener('hidden.bs.modal', function () {
    var videoFrame = document.getElementById('videoFrame');
    videoFrame.src = ''; 
});

function openModal(videoUrl) {
    var videoFrame = document.getElementById('videoFrame');
    videoFrame.src = videoUrl;
    var myModal = new bootstrap.Modal(document.getElementById('videoModal'));
    myModal.show();
}
