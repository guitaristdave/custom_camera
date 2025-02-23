    const video = document.getElementById('video');
    const captureBtn = document.getElementById('captureBtn');
    const gallerySection = document.getElementById('gallerySection');
    const galleryItems = document.getElementById('galleryItems');
    const generalPhoto = document.getElementById('generalPhoto');

    let stream = null;
    const gallery = [];

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        video.srcObject = stream;
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    const stopCamera = () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };

    const setGeneralPhoto = (photoSrc) => {
      generalPhoto.src = photoSrc;
      generalPhoto.style.display = 'block';
    };

    const capturePhoto = () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      gallery.push(dataUrl);
      updateGallery();
    };

    const updateGallery = () => {
      gallerySection.style.display = 'flex';
      galleryItems.innerHTML = '';

      gallery.forEach((photo, index) => {
        const img = document.createElement('img');
        img.src = photo;
        img.alt = `Gallery Item ${index + 1}`;
        img.classList.add('gallery-item');
        img.addEventListener('click', () => setGeneralPhoto(photo));
        galleryItems.appendChild(img);
      });
    };

    captureBtn.addEventListener('click', capturePhoto);

    window.addEventListener('DOMContentLoaded', startCamera);
    window.addEventListener('beforeunload', stopCamera);