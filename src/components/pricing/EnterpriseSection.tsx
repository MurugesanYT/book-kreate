
import React from 'react';
import { Link } from 'react-router-dom';

const EnterpriseSection = () => {
  return (
    <div className="text-center mt-12 text-slate-600 bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-slate-100 max-w-3xl mx-auto">
      <h3 className="font-medium text-xl mb-3">Need a custom solution?</h3>
      <p>Our Enterprise plan can be tailored to your specific needs.</p>
      <Link to="/contact" className="text-book-purple font-medium underline mt-2 inline-block">Contact us</Link>
    </div>
  );
};

export default EnterpriseSection;
