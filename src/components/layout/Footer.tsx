import Link from "next/link";
import { HeartPulse, Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-muted/30 border-t border-border mt-auto">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-primary/10 rounded-lg">
                                <HeartPulse className="w-5 h-5 text-primary" />
                            </div>
                            <span className="text-xl font-bold font-display tracking-tight text-foreground">
                                CareBridge
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Empowering communities with immediate healthcare guidance, trusted access, and personal wellness tools.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold mb-4 text-foreground">Platform</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/symptoms" className="text-muted-foreground hover:text-primary transition-colors">
                                    Symptom Checker
                                </Link>
                            </li>
                            <li>
                                <Link href="/find-care" className="text-muted-foreground hover:text-primary transition-colors">
                                    Find Nearby Care
                                </Link>
                            </li>
                            <li>
                                <Link href="/emergency" className="text-muted-foreground hover:text-destructive transition-colors">
                                    Emergency Support
                                </Link>
                            </li>
                            <li>
                                <Link href="/tracker" className="text-muted-foreground hover:text-primary transition-colors">
                                    Health Tracker
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-semibold mb-4 text-foreground">Resources</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/library" className="text-muted-foreground hover:text-primary transition-colors">
                                    Health Library
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                                    Our Mission
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                    Community Impact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact / Social */}
                    <div>
                        <h3 className="font-semibold mb-4 text-foreground">Connect</h3>
                        <div className="flex gap-4">
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Twitter className="w-5 h-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Linkedin className="w-5 h-5" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Github className="w-5 h-5" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                        </div>
                        <p className="mt-4 text-xs text-muted-foreground">
                            © {new Date().getFullYear()} CareBridge.
                            <br />
                            Smart Healthcare Access.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
