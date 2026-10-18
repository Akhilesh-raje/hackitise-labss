import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, UserCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { StaggerContainer, StaggerItem, SectionHeader } from '../ui/AnimationUtils';
import { useApiData } from '../../hooks/useApiData';

const fallbackTestimonials = [
  { 
    name: 'David Meece, MSc, MBA', 
    role: 'Cybersecurity Professional | Global Top 50 Creator', 
    text: "Congrats my friend!! I love what you're doing for the community brother! Keep up the good fight.", 
    rating: 5, 
    color: 'theme-primary' 
  },
  { 
    name: 'Patrick Gorman', 
    role: 'Cybersecurity Leader | Founder & CEO @ ISP Security', 
    text: "Thank you and it's an honor to be part of the team and we will do amazing things together.", 
    rating: 5, 
    color: 'theme-secondary-dark' 
  },
  { 
    name: 'Himanshu Awasthi', 
    role: 'Sr. Security Engineer | Offensive, Defense & GRC', 
    text: 'Huge congratulations to the entire team at Hackitise Labs on the V2 launch! The expansion into the UAE and EU markets is a massive milestone. Keep doing good and exciting work.', 
    rating: 5, 
    color: 'theme-primary-dark' 
  },
  { 
    name: 'Rear Admiral Mohit Gupta VSM (Retd)', 
    role: 'Cyber Security Advisor | Defence Technology Expert', 
    text: 'Great initiative. Cyber shiksha is the need of the hour to stay safe in the digital world. Awareness is a large part of the solution against hackers.', 
    rating: 5, 
    color: 'theme-primary' 
  },
  { 
    name: 'Ritchie Checo', 
    role: 'Multi-Cloud Infrastructure & Security Engineer', 
    text: "Patrick Gorman has some great and insightful YouTube videos with a lot of information. Having him join y'all with the experience and knowledge he brings is going to be an incredible journey going forward.", 
    rating: 5, 
    color: 'theme-secondary-dark' 
  },
  { 
    name: 'Vanisha Agrawal', 
    role: 'IT Undergraduate | AWS Certified | CTF Winner', 
    text: 'It was so amazing to be a part of such an adventurous event!! Learnt a lot!', 
    rating: 5, 
    color: 'theme-primary-dark' 
  },
  { 
    name: 'Linda Babalola', 
    role: 'Market Intelligence & International Expansion Expert', 
    text: "I'm excited for Hackitise Labs Pvt. Ltd. Well done! GCC and EU structure setup is our expertise. Depending on what you want, we're open to collaborations.", 
    rating: 5, 
    color: 'theme-primary' 
  },
  { 
    name: 'Amrendra Yadav', 
    role: 'Generative AI & Cloud Engineer', 
    text: 'This is incredible! An offline CTF with real servers and a high-stakes storyline-that\'s a game-changer. So proud of the entire VOID Society @KIET for putting together such a unique and challenging event.', 
    rating: 5, 
    color: 'theme-secondary-dark' 
  },
  { 
    name: 'Keshav A.', 
    role: 'Digital Forensics | AWS Solutions Architect', 
    text: 'I learned so many things from this event. Big thanks to the organizers.', 
    rating: 5, 
    color: 'theme-primary-dark' 
  },
  { 
    name: 'Aayushman Kharkwal', 
    role: 'Cyber Security Student | Aspiring Penetration Tester', 
    text: 'Had a great time learning and a big thanks to the mentors for an amazing workshop. I learned so much and had a great experience. Excited to put what I\'ve learned into action!', 
    rating: 5, 
    color: 'theme-primary' 
  },
];

const TestimonialCard = ({ testimonial, featured = false, compact = false }) => (
  <motion.div 
    whileHover={{ scale: featured ? 1.02 : 1 }}
    className={`neo-card group relative overflow-hidden h-full flex flex-col hover:shadow-glow-primary transition-all border border-theme-border/50 hover:border-theme-primary/30 ${
      featured ? 'p-8' : compact ? 'p-4' : 'p-6'
    }`}
  >
    {/* Quote Icon Background */}
    {!compact && (
      <div className="absolute top-4 right-4 text-theme-primary/5 -z-10 group-hover:scale-110 group-hover:opacity-10 transition-all">
        <Quote size={featured ? 80 : 60} />
      </div>
    )}

    {/* Rating stars */}
    <div className="flex gap-1 mb-4">
      {[...Array(testimonial.rating)].map((_, i) => (
        <Star key={i} size={compact ? 12 : featured ? 16 : 14} className="fill-theme-secondary text-theme-secondary" />
      ))}
    </div>

    {/* Testimonial text */}
    <p className={`text-theme-text-muted italic mb-6 relative z-10 leading-relaxed ${
      featured ? 'text-lg' : compact ? 'text-[11px] line-clamp-4' : 'text-sm'
    }`}>
      "{testimonial.text}"
    </p>

    {/* Author info */}
    <div className={`mt-auto flex items-center gap-3 border-t border-theme-border/5 pt-4 relative z-10`}>
      <div className={`${compact ? 'w-9 h-9' : featured ? 'w-12 h-12' : 'w-10 h-10'} rounded-full ${
        testimonial.color === 'theme-primary' ? 'bg-theme-primary' : 
        testimonial.color === 'theme-secondary-dark' ? 'bg-theme-secondary-dark' : 
        'bg-theme-primary-dark'
      } flex items-center justify-center text-theme-text-inverse shadow-glow-primary flex-shrink-0`}>
        <UserCircle size={compact ? 20 : featured ? 28 : 24} />
      </div>
      <div className="min-w-0 flex-1">
        <h4 className={`font-bold text-theme-text-strong ${compact ? 'text-xs truncate' : featured ? 'text-base' : 'text-sm'}`}>{testimonial.name}</h4>
        <p className={`text-theme-text-muted ${compact ? 'text-[10px] line-clamp-2' : featured ? 'text-xs' : 'text-[10px]'}`}>{testimonial.role}</p>
      </div>
    </div>
  </motion.div>
);

const Testimonials = () => {
  const { data: testimonials } = useApiData('/testimonials', fallbackTestimonials);
  const [isPaused, setIsPaused] = React.useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = React.useState(null);
  
  const topTestimonials = testimonials.slice(0, 3);

  return (
    <section className="mt-20 px-4">
      <SectionHeader title="Trusted by Global Teams" badge="Testimonials" icon={Star} />
      
      {/* Top 3 Featured Testimonials */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-8">
        {topTestimonials.map((t, i) => (
          <StaggerItem key={i}>
            <TestimonialCard testimonial={t} featured={true} />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Infinite Scrolling Carousel - Compact & Fast */}
      <div className="mt-12 relative overflow-hidden">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-theme-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-theme-bg to-transparent z-10 pointer-events-none" />

        {/* Scrolling testimonials */}
        <motion.div
          className="flex gap-3"
          animate={{
            x: [0, `-${100 / 2}%`],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 35,
              ease: 'linear',
            },
          }}
          style={{
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {[...testimonials, ...testimonials].map((t, idx) => (
            <motion.div 
              key={idx} 
              className="flex-shrink-0 w-[260px] h-[220px] cursor-pointer"
              whileHover={{ 
                scale: 1.1,
                zIndex: 20,
                transition: { duration: 0.2 }
              }}
              onClick={() => setSelectedTestimonial(t)}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <TestimonialCard testimonial={t} featured={false} compact={true} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal for expanded testimonial */}
      {selectedTestimonial && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedTestimonial(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="neo-card p-8 md:p-12 relative">
              {/* Close button */}
              <button
                onClick={() => setSelectedTestimonial(null)}
                className="absolute top-4 right-4 text-theme-text-muted hover:text-theme-primary transition-colors text-2xl font-bold"
              >
                ×
              </button>

              {/* Quote Icon */}
              <div className="text-theme-primary/10 mb-6">
                <Quote size={60} />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(selectedTestimonial.rating)].map((_, i) => (
                  <Star key={i} size={20} className="fill-theme-secondary text-theme-secondary" />
                ))}
              </div>

              {/* Text */}
              <p className="text-theme-text-muted italic mb-8 text-xl leading-relaxed">
                "{selectedTestimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 border-t border-theme-border/30 pt-6">
                <div className={`w-14 h-14 rounded-full ${
                  selectedTestimonial.color === 'theme-primary' ? 'bg-theme-primary' : 
                  selectedTestimonial.color === 'theme-secondary-dark' ? 'bg-theme-secondary-dark' : 
                  'bg-theme-primary-dark'
                } flex items-center justify-center text-theme-text-inverse shadow-glow-primary`}>
                  <UserCircle size={32} />
                </div>
                <div>
                  <h4 className="font-bold text-theme-text-strong text-lg">{selectedTestimonial.name}</h4>
                  <p className="text-sm text-theme-text-muted">{selectedTestimonial.role}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Testimonials;
