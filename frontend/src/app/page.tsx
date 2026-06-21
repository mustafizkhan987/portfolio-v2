import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import CertificationsSection from "@/components/CertificationsSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <CertificationsSection />
      <BlogSection />
      <ContactSection />
    </main>
  );
}
