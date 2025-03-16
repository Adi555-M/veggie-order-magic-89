
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-12 md:py-16 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">About Fresh vegetables By Parshv Food's</h1>
              <p className="text-lg text-gray-600">Your trusted partner for fresh vegetables delivery</p>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <p>
                Fresh vegetables By Parshv Food's was born from a simple idea: to make fresh, quality vegetables accessible to everyone without the hassle of going to the market. We understand that in today's busy world, finding time to shop for groceries can be challenging. That's why we bring the market to your doorstep!
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
              <p>
                Our mission is to provide the freshest, highest-quality vegetables to our customers while offering exceptional service. We source our vegetables directly from trusted local markets, ensuring that our produce is fresh and carefully selected. By working closely with market vendors, we're able to offer competitive prices while maintaining quality.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">Our Values</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Quality:</strong> We never compromise on the quality of our produce. Each vegetable is carefully selected to ensure freshness and taste.</li>
                <li><strong>Reliability:</strong> We pride ourselves on timely deliveries and accurate orders. Your time is valuable, and we respect that.</li>
                <li><strong>Convenience:</strong> We make it easy for you to order fresh vegetables from the comfort of your home.</li>
                <li><strong>Community:</strong> We believe in supporting local markets and strengthening the community through good food.</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">Why Choose Us?</h2>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-3 text-veggie-700">Market Fresh</h3>
                  <p>Our vegetables are sourced directly from trusted local markets, ensuring freshness and quality.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-3 text-veggie-700">Convenient Ordering</h3>
                  <p>Our easy-to-use website makes ordering vegetables simple and quick. Just a few clicks, and your order is on its way!</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-3 text-veggie-700">Flexible Delivery</h3>
                  <p>For orders placed by 10 PM, we deliver the next day between 8 AM and 11 AM. You can place orders anytime between 6 AM and 10 PM for delivery the following day.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-3 text-veggie-700">Quality Guaranteed</h3>
                  <p>We stand behind our produce. If you're not 100% satisfied with the quality, we'll replace it or refund your money.</p>
                </div>
              </div>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">Join Our Community</h2>
              <p>
                When you order from Fresh vegetables By Parshv Food's, you're not just a customer—you're part of our community. We're committed to providing not just vegetables, but an experience that makes healthy eating more accessible and enjoyable.
              </p>
              <p>
                Thank you for choosing Fresh vegetables By Parshv Food's. We look forward to serving you with the freshest vegetables and the best service possible!
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
