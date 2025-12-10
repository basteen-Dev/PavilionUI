import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Clock } from 'lucide-react';
import { jobs } from '../../lib/data';

export function CareersPage() {
  const activeJobs = jobs.filter(j => j.active);

  return (
    <div>
      {/* Banner */}
      <div className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="mb-6">Join Our Team</h1>
            <p className="text-xl text-blue-100">
              Be part of India&apos;s premier sports equipment retail brand. Build your career in an environment that celebrates passion for sports and excellence in customer service.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction */}
        <div className="mb-16">
          <h2 className="mb-6">About Working at Pavilion Sports</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 mb-4">
                Since 1988, Pavilion Sports has been at the forefront of India&apos;s sports retail industry. We pride ourselves on our deep product knowledge, authentic merchandise, and commitment to helping athletes at every level achieve their best.
              </p>
              <p className="text-gray-700">
                When you join our team, you become part of a legacy built on expertise, integrity, and genuine passion for sports. We offer competitive compensation, growth opportunities, and a dynamic work environment.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1593766787879-e8c78e09cec5?w=800"
                alt="Pavilion Sports Team"
                className="rounded-lg shadow-lg w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Why Work With Us */}
        <div className="mb-16">
          <h2 className="mb-8">Why Work With Pavilion Sports</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="mb-2">Career Growth</h3>
              <p className="text-gray-600">
                Clear career progression paths with opportunities to develop expertise and take on leadership roles
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="mb-2">Competitive Benefits</h3>
              <p className="text-gray-600">
                Attractive salary packages, performance incentives, and comprehensive employee benefits
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚽</span>
              </div>
              <h3 className="mb-2">Sports Culture</h3>
              <p className="text-gray-600">
                Work with premium sports equipment daily and be part of a team that lives and breathes sports
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="mb-2">Learning & Development</h3>
              <p className="text-gray-600">
                Continuous training on products, sales techniques, and customer service excellence
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="mb-2">Collaborative Environment</h3>
              <p className="text-gray-600">
                Work alongside passionate professionals in a supportive, team-oriented atmosphere
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="mb-2">Industry Leader</h3>
              <p className="text-gray-600">
                Be part of India&apos;s most trusted sports equipment retailer with 36+ years of excellence
              </p>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div>
          <h2 className="mb-8">Current Openings</h2>
          {activeJobs.length > 0 ? (
            <div className="space-y-4">
              {activeJobs.map((job) => (
                <Link
                  key={job.id}
                  to={`/careers/${job.slug}`}
                  className="block bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">
                        Posted {new Date(job.postedDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                      </span>
                      <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
              <div className="text-6xl mb-4">💼</div>
              <h3 className="mb-2">No openings at the moment</h3>
              <p className="text-gray-600 mb-6">
                We don&apos;t have any active job postings right now, but we&apos;re always looking for talented individuals.
              </p>
              <p className="text-sm text-gray-500">
                Send your resume to careers@pavilionsports.com to be considered for future opportunities.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
