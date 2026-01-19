import { BookOpen, CheckCircle2, Info, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LibraryPage() {
    const articles = [
        { title: "Fever: When to worry?", category: "General", readTime: "3 min", risk: "Low", content: "Most fevers go away on their own. Drink fluids and rest." },
        { title: "Cold vs. Flu", category: "Seasonal", readTime: "5 min", risk: "Low", content: "Flu is sudden and severe. Cold is gradual and milder." },
        { title: "Dehydration Signs", category: "Prevention", readTime: "4 min", risk: "Moderate", content: "Dry mouth, dizziness, and dark urine are key signs." },
        { title: "Dengue Precautions", category: "Urgent", readTime: "6 min", risk: "High", content: "Prevent mosquito bites. Watch for high fever and rash." },
        { title: "Mental Burnout", category: "Wellness", readTime: "7 min", risk: "Moderate", content: "Feeling exhausted? Take breaks and disconnect." },
        { title: "Food Poisoning", category: "Diet", readTime: "4 min", risk: "Moderate", content: "Stay hydrated. Avoid solid foods initially." },
    ];

    return (
        <div className="container mx-auto px-4 py-8 md:py-16 min-h-screen">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                <Badge variant="outline" className="mb-2 bg-primary/5 text-primary border-primary/20">Verified Health Library</Badge>
                <h1 className="text-4xl font-bold font-display">Trusted Health Knowledge</h1>
                <p className="text-muted-foreground text-lg">
                    Simple, verified guides to help you understand common symptoms and stay healthy.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article, i) => (
                    <Card key={i} className="flex flex-col hover:shadow-lg transition-all hover:border-primary/50 group">
                        <CardHeader>
                            <div className="flex justify-between items-start mb-2">
                                <Badge variant="secondary" className="bg-muted text-muted-foreground">{article.category}</Badge>
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <BookOpen className="w-3 h-3" /> {article.readTime}
                                </span>
                            </div>
                            <CardTitle className="text-xl group-hover:text-primary transition-colors">{article.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <p className="text-muted-foreground leading-relaxed">{article.content}</p>
                        </CardContent>
                        <CardFooter className="pt-0 flex justify-between items-center border-t border-border/50 pt-4 mt-4 bg-muted/20">
                            <div className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
                                <CheckCircle2 className="w-3 h-3" /> Verified Source
                            </div>
                            <a href={`https://medlineplus.gov/search?q=${encodeURIComponent(article.title)}`} target="_blank" rel="noopener noreferrer">
                                <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform p-0 hover:bg-transparent">
                                    Read More <ArrowRight className="ml-1 w-4 h-4" />
                                </Button>
                            </a>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <div className="mt-20 p-8 bg-blue-50 dark:bg-blue-950/20 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100">Fight Misinformation</h3>
                    <p className="text-blue-700 dark:text-blue-300">We only use trusted sources like WHO, CDC, and verified medical journals.</p>
                </div>
                <a href="https://www.who.int/emergencies/diseases/en/" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20">
                        View All Sources <Info className="ml-2 w-4 h-4" />
                    </Button>
                </a>
            </div>
        </div>
    );
}
