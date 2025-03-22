import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 text-center bg-gradient-to-b from-white to-gray-50">
          <h1 className="text-5xl font-bold mb-6">Find The Perfect Freelance Services</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with talented freelancers and get your projects done quickly and efficiently
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg">Find Work</Button>
            <Button size="lg" variant="outline">Hire Talent</Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose NexaTrade</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <h3 className="text-xl font-semibold mb-4">Top Talents</h3>
                <p className="text-gray-600">Access a global network of skilled professionals</p>
              </div>
              <div className="text-center p-6">
                <h3 className="text-xl font-semibold mb-4">Secure Payments</h3>
                <p className="text-gray-600">Safe and secure payment protection system</p>
              </div>
              <div className="text-center p-6">
                <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
                <p className="text-gray-600">Round-the-clock customer support</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-primary text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8">Join thousands of freelancers and businesses using NexaTrade</p>
            <Button size="lg" variant="secondary">
              Create Free Account
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}