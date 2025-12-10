import { useParams, Link } from 'react-router-dom';
import { Briefcase, MapPin, Clock, Send } from 'lucide-react';
import { jobs } from '../../lib/data';
import { useState } from 'react';

export function JobDetailPage() {
  const { slug } = useParams();
  const job = jobs.find((j) => j.slug === slug && j.active);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: '',
    coverLetter: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Application submitted for ${job?.title}! We will review your application and get back to you soon.`);
    setFormData({ name: '', email: '', phone: '', resume: '', coverLetter: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!job) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="mb-4">Job Not Found</h1>
        <p className="text-gray-600 mb-6">This job posting no longer exists or has been filled.</p>
        <Link to="/careers" className="text-blue-600 hover:text-blue-700">
          View all openings →
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/careers" className="text-blue-200 hover:text-white mb-4 inline-block">
            ← Back to Careers
          </Link>
          <h1 className="mb-4">{job.title}</h1>
          <div className="flex flex-wrap gap-4 text-blue-100">
            <span className="flex items-center gap-1">
              <Briefcase className="w-5 h-5" />
              {job.department}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-5 h-5" />
              {job.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-5 h-5" />
              {job.type}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Job Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h2 className="mb-4">Job Description</h2>
              <p className="text-gray-700 mb-8">{job.description}</p>

              <h3 className="mb-4">Key Responsibilities</h3>
              <ul className="space-y-2 mb-8">
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>

              <h3 className="mb-4">Requirements</h3>
              <ul className="space-y-2">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Application Form */}
          <div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
              <h3 className="mb-6">Apply for this Position</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm mb-1 text-gray-700">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm mb-1 text-gray-700">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm mb-1 text-gray-700">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="resume" className="block text-sm mb-1 text-gray-700">
                    Resume/CV Link *
                  </label>
                  <input
                    type="url"
                    id="resume"
                    name="resume"
                    value={formData.resume}
                    onChange={handleChange}
                    placeholder="https://..."
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Share a link to your resume (Google Drive, Dropbox, etc.)
                  </p>
                </div>

                <div>
                  <label htmlFor="coverLetter" className="block text-sm mb-1 text-gray-700">
                    Cover Letter
                  </label>
                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Tell us why you're a great fit for this role..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Send className="w-5 h-5" />
                  Submit Application
                </button>
              </form>

              <p className="text-xs text-gray-500 mt-4">
                By submitting this application, you agree to our data processing terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
