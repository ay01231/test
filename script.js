function uploadFile() {
  const input = document.getElementById('fileInput');
  const file = input.files[0];
  if (!file) {
      alert('Please select a file first!');
      return;
  }

  const formData = new FormData();
  formData.append('file', file);

  fetch('http://localhost:8000/upload', { 
      method: 'POST',
      body: formData,
  })
  .then(response => response.json())
  .then(data => {
      console.log(data);
      alert('File uploaded successfully!');
  })
  .catch(error => {
      console.error('Error:', error);
      alert('Error uploading file');
  });
}

function downloadFile() {
  fetch('http://localhost:8000/download') 
      .then(response => response.blob())
      .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = 'downloaded_file.txt'; 
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          alert('Your file has been downloaded!');
      })
      .catch(error => {
          console.error('Error:', error);
          alert('Error downloading file');
      });
}
