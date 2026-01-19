import Link from "next/link";
import { HeartPulse, Github, Twitter, Linkedin, ArrowRight } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="md:col-span-5 space-y-6">
                        <Link href="/" className="inline-flex items-center gap-2 group">
                            <div className="p-2 bg-indigo-500/10 rounded-xl group-hover:bg-indigo-500/20 transition-colors">
                                <HeartPulse className="w-6 h-6 text-indigo-400" />
                            </div>
                            <span className="text-2xl font-bold font-display tracking-tight text-white">
                                CareBridge
                            </span>
                        </Link>
                        <p className="text-slate-400 leading-relaxed max-w-md text-lg">
                            The world's first offline-ready emergency response system.
                            Bridging the gap between the Golden Hour and survival.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <SocialLink icon={Twitter} href="#" label="Twitter" />
                            <SocialLink icon={Linkedin} href="#" label="LinkedIn" />
                            <SocialLink icon={Github} href="#" label="GitHub" />
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="font-bold text-white mb-6">Product</h3>
                            <ul className="space-y-4">
                                <FooterLink href="/#problem">The Problem</FooterLink>
                                <FooterLink href="/#solution">The Solution</FooterLink>
                                <FooterLink href="/#timeline">How it Works</FooterLink>
                                <FooterLink href="/#technology">Technology</FooterLink>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-white mb-6">Resources</h3>
                            <ul className="space-y-4">
                                <FooterLink href="/emergency">Emergency Mode</FooterLink>
                                <FooterLink href="/library">First Aid Library</FooterLink>
                                <FooterLink href="/find-care">Find Hospitals</FooterLink>
                                <FooterLink href="#">Impact Report</FooterLink>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-white mb-6">Legal</h3>
                            <ul className="space-y-4">
                                <FooterLink href="#">Privacy Policy</FooterLink>
                                <FooterLink href="#">Terms of Service</FooterLink>
                                <FooterLink href="#">Cookie Policy</FooterLink>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>© {new Date().getFullYear()} CareBridge Systems. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Made with <HeartPulse className="w-3 h-3 text-red-500 animate-pulse" /> for humanity.
                    </p>
                </div>
            </div>
        </footer>
    );
};

const SocialLink = ({ icon: Icon, href, label }: { icon: any, href: string, label: string }) => (
    <Link
        href={href}
        className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-indigo-500 hover:text-white transition-all duration-300"
        aria-label={label}
    >
        <Icon className="w-5 h-5" />
    </Link>
);

const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <li>
        <Link
            href={href}
            className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-2 group"
        >
            <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
            {children}
        </Link>
    </li>
);

export default Footer;
