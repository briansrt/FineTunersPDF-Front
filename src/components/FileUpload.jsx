import { useState } from 'react';
import { Upload, X } from 'lucide-react';
import DropZone from './DropZone';
import ImagePreview from './ImagePreview';
import './styles/FileUpload.css';

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
  };

  const isValidPhoneNumber = (number) => {
    const phoneRegex = /^\d{7,15}$/; // Validates phone numbers with 7 to 15 digits
    return phoneRegex.test(number);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    if (!phoneNumber || !isValidPhoneNumber(phoneNumber)) {
      alert('Please enter a valid phone number.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('document', file);
    formData.append('phoneNumber', `${countryCode}${phoneNumber}`);

    try {
      const response = await fetch('http://localhost:4000/api/process-document', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Simulate upload progress
        for (let i = 0; i <= 100; i += 10) {
          setUploadProgress(i);
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
        alert('File uploaded successfully!');
      } else {
        throw new Error('Error uploading file');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error uploading file');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleRemove = () => {
    setFile(null);
  };

  return (
    <div className="file-upload">
      <h2 className="file-upload__title">Upload Post-Surgery File</h2>
      <DropZone onFileChange={handleFileChange} />
      {file && (
        <div className="file-upload__preview">
          <ImagePreview file={file} />
          <div className="file-upload__file-info">
            <span className="file-upload__file-name">{file.name}</span>
            <button
              onClick={handleRemove}
              className="file-upload__remove-button"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      <div className="file-upload__phone-input">
        <label htmlFor="countryCode">Country Code:</label>
        <select
          id="countryCode"
          value={countryCode}
          onChange={handleCountryCodeChange}
        >
          <option value="+1">+1 (USA)</option>
        <option value="+44">+44 (UK)</option>
        <option value="+49">+49 (Germany)</option>
        <option value="+33">+33 (France)</option>
        <option value="+81">+81 (Japan)</option>
        <option value="+34">+34 (Spain)</option>
        <option value="+39">+39 (Italy)</option>
        <option value="+55">+55 (Brazil)</option>
        <option value="+61">+61 (Australia)</option>
        <option value="+91">+91 (India)</option>
        <option value="+86">+86 (China)</option>
        <option value="+7">+7 (Russia)</option>
        <option value="+52">+52 (Mexico)</option>
        <option value="+57">+57 (Colombia)</option>
        <option value="+27">+27 (South Africa)</option>

          {/* Add more country codes as needed */}
        </select>
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder="Enter phone number"
        />
      </div>

      <button
        onClick={handleUpload}
        disabled={!file || isUploading}
        className={`button file-upload__button ${(!file || isUploading) ? 'file-upload__button--disabled' : ''}`}
      >
        {isUploading ? (
          <div className="file-upload__progress">
            <Upload className="file-upload__progress-icon" size={20} />
            <span>{uploadProgress}%</span>
          </div>
        ) : (
          'Upload File'
        )}
      </button>

      <p className="file-upload__info">
        Send join jet-finger to +1 (415) 523-8886 to connect your phone with the API.
      </p>
    </div>
  );
}
