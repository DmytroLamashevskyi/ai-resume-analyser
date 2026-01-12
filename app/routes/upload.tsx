import NavBar from '~/components/NavBar'
import type { Route } from './+types/upload';
import { useState, type FormEvent } from 'react';
import FileUploader from '~/components/FileUploader';
import { usePuterStore } from '~/lib/puter';
import { useNavigate } from 'react-router';
import { convertPdfToImage } from '~/lib/pdf2img';
import { generateUUID } from '~/lib/utils';
import { AIResponseFormat, prepareInstructions } from '../../constants';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Upload Resume" },
        { name: "description", content: "Upload your resume to get analysed" },
    ];
}

const upload = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();

    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file);
    }

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File }) => {
        setIsProcessing(true);
        setStatusText('Uploading your file...');

        const uploadedFile = await fs.upload([file]);

        if (!uploadedFile) {
            setStatusText('Error: Failed to upload file');
            setIsProcessing(false);
            return;
        }

        setStatusText('Converting your file...');
        const imgFile = await convertPdfToImage(file);
        console.log(imgFile);

        if (!imgFile.file) {
            setStatusText('Error: Failed to convert file');
            return;
        }

        setStatusText('Uploading image file...');
        const uploadedImage = await fs.upload([imgFile.file]);

        if (!uploadedImage) {
            setStatusText('Error: Failed to upload image file');
            return;
        }

        setStatusText('Preparing data for analysis...');
        const uuid = generateUUID();
        const data = {
            id: uuid,
            companyName,
            jobTitle,
            jobDescription,
            filePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            createdAt: new Date(),
            updatedAt: new Date(),
            feedback: ''
        }
        await kv.set(uuid, JSON.stringify(data));

        setStatusText('Analyzing...');
        const feedback = await ai.feedback(uploadedFile.path, prepareInstructions({ jobTitle, jobDescription, AIResponseFormat }));
        if (!feedback) return setStatusText('Filed to analyse your resume');


        const feedbacText = typeof feedback.message.content === 'string' ? feedback.message.content : feedback.message.content[0].text;

        data.feedback = feedbacText;
        await kv.set(uuid, JSON.stringify(data));

        console.log(feedbacText);
        setStatusText('Analysis complete');
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget.closest('form')
        if (!form) return;

        const formData = new FormData(form);
        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if (!file) return;

        handleAnalyze({ companyName, jobTitle, jobDescription, file });
    }

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <NavBar />
            <section className="main-section">
                <div className="page-heading py-16">
                    <h1>Smart feedback for your dream job</h1>
                    {isProcessing ? (
                        <>
                            <h2>{statusText}</h2>
                            <img src="/images/resume-scan.gif" alt="loading" className='w-full' />
                        </>
                    ) : (
                        <h2>Drop your resume for ATS score and improvement tips</h2>
                    )}
                    {!isProcessing && (
                        <form id='upload-form' onSubmit={handleSubmit} className='flex flex-col gap-4 mt-8'>
                            <div className='form-div'>
                                <label htmlFor="company-name">Company Name</label>
                                <input type="text" id="company-name" name='company-name' placeholder='Company Name' />
                            </div>
                            <div className='form-div'>
                                <label htmlFor="job-title">Job Title</label>
                                <input type="text" id="job-title" name='job-title' placeholder='Job Title' />
                            </div>
                            <div className='form-div'>
                                <label htmlFor="job-description">Job Description</label>
                                <textarea rows={6} id="job-description" name='job-description' placeholder='Job Description' />
                            </div>
                            <div className='form-div'>
                                <label htmlFor="uploader">Upload Resume</label>
                                <FileUploader onFileSelect={handleFileSelect} file={file} />
                            </div>
                            <button type='submit' className='primary-button'>Analyze Resume</button>
                        </form>
                    )}
                </div>
            </section>
        </main>
    )
}

export default upload