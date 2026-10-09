import { useState } from 'react'
import './App.css'

const App = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [resumes, setResumes] = useState([]);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) =>{
    const selectedFiles = Array.from(e.target.files || []);

    const invalidFiles = selectedFiles.filter(
      (file) => !file.name.toLowerCase().endsWith(".pdf")
    )

    if(invalidFiles.length > 0){
      setResumes([]);
      setMessage("Please select PDF resumes only.");
      e.target.value = "";
      return;
    }
    setResumes(selectedFiles);
    setMessage("");
  }

  const handleAnalyze = () =>{
    if (!jobDescription.trim()){
      setMessage("Please enter the job description");
      return;
    }

    if(resumes.length === 0){
      setMessage("Please upload at least one resume.");
      return;
    }

    setMessage(
      `${resumes.length} resumes(s) selected. Backend integration is our next step`
    )
  }


  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">R</div>
          <div>
            <h2>ResumeIQ</h2>
            <p>Recruiter workspace</p>
          </div>
        </div>

        <nav className="navigation">
          <div className="nav-item active">▦ &nbsp; Screening</div>
          <div className="nav-item">▤ &nbsp; Job descriptions</div>
          <div className="nav-item">◷ &nbsp; Screening history</div>
        </nav>

        <div className="sidebar-footer">
          <div className="avatar">HR</div>
          <div>
            <strong>Recruiter</strong>
            <p>HR workspace</p>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <span>Workspace / Resume screening</span>
          <span className="status-badge">
            <span className="status-dot" />
            MVP workspace
          </span>
        </header>

        <section className="page-heading">
          <p className="eyebrow">AI-POWERED RECRUITMENT</p>
          <h1>Find the right talent.</h1>
          <p className="subtitle">
            Compare candidate resumes against your job requirements
            and prepare for intelligent candidate screening.
          </p>
        </section>

        <section className="workflow">
          <div className="step active-step">
            <span>1</span>
            Job requirements
          </div>
          <div className="step-line" />
          <div className="step">
            <span>2</span>
            Upload resumes
          </div>
          <div className="step-line" />
          <div className="step">
            <span>3</span>
            Review matches
          </div>
        </section>

        <section className="content-grid">
          <div className="panel job-panel">
            <div className="panel-heading">
              <div className="section-icon">01</div>
              <div>
                <h2>Job description</h2>
                <p>Define the requirements for your open position.</p>
              </div>
            </div>

            <label htmlFor="job-title">Position requirements</label>

            <textarea
              id="job-title"
              value={jobDescription}
              onChange={(event) => setJobDescription(event.target.value)}
              placeholder={`Paste the job description here...\n\nInclude responsibilities, required skills, qualifications, and experience.`}
              rows={12}
            />

            <div className="field-footer">
              <span>Include as much relevant detail as possible.</span>
              <span>{jobDescription.length} characters</span>
            </div>
          </div>

          <div className="panel upload-panel">
            <div className="panel-heading">
              <div className="section-icon">02</div>
              <div>
                <h2>Candidate resumes</h2>
                <p>Upload multiple PDF resumes for screening.</p>
              </div>
            </div>

            <label htmlFor="resume-files" className="upload-area">
              <div className="upload-icon">↑</div>
              <h3>Upload candidate resumes</h3>
              <p>
                Select multiple PDF files from your computer.
              </p>
              <span className="browse-button">Choose PDF files</span>
              <small>PDF format only · Multiple files supported</small>
            </label>

            <input
              id="resume-files"
              type="file"
              accept=".pdf,application/pdf"
              multiple
              onChange={handleFileChange}
              hidden
            />

            <div className="file-section">
              <div className="file-section-heading">
                <strong>Selected files</strong>
                <span>{resumes.length}</span>
              </div>

              {resumes.length === 0 ? (
                <div className="empty-state">
                  Your selected resumes will appear here.
                </div>
              ) : (
                <ul className="file-list">
                  {resumes.map((file, index) => (
                    <li
                      className="file-item"
                      key={`${file.name}-${index}`}
                    >
                      <div className="pdf-icon">PDF</div>
                      <div className="file-info">
                        <strong>{file.name}</strong>
                        <span>
                          {(file.size / 1024).toFixed(1)} KB
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>

        <section className="action-panel">
          <div>
            <h3>Ready to screen candidates?</h3>
            <p>
              The next stage will connect this workspace to our
              resume-processing backend.
            </p>
          </div>

          <button onClick={handleAnalyze}>
            Analyze resumes <span>→</span>
          </button>
        </section>

        {message && (
          <div className="message" role="status">
            {message}
          </div>
        )}

        <footer className="page-footer">
          ResumeIQ · AI Resume Screening &amp; Job Matching Platform
        </footer>
      </main>
    </div>
  )
}

export default App
