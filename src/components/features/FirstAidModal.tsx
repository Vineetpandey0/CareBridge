import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertOctagon, Phone } from "lucide-react";
import { FirstAidGuide } from "@/data/firstAidGuides";

interface FirstAidModalProps {
    guide: FirstAidGuide;
    trigger?: React.ReactNode;
}

export function FirstAidModal({ guide, trigger }: FirstAidModalProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger || <Button variant="outline">View Guide</Button>}
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        {guide.title}
                    </DialogTitle>
                    <DialogDescription className="text-base text-muted-foreground">
                        {guide.description}
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="h-[60vh] pr-4">
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <h3 className="font-semibold text-lg flex items-center gap-2 text-blue-600">
                                Actions Steps
                            </h3>
                            <ol className="list-decimal pl-5 space-y-2">
                                {guide.steps.map((step, i) => (
                                    <li key={i} className="font-medium">{step}</li>
                                ))}
                            </ol>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-lg">
                                <h4 className="font-bold text-green-700 flex items-center gap-2 mb-2">
                                    <CheckCircle2 className="w-4 h-4" /> Do This
                                </h4>
                                <ul className="space-y-1 text-sm">
                                    {guide.dos.map((d, i) => <li key={i}>• {d}</li>)}
                                </ul>
                            </div>

                            <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg">
                                <h4 className="font-bold text-red-700 flex items-center gap-2 mb-2">
                                    <XCircle className="w-4 h-4" /> NOT This
                                </h4>
                                <ul className="space-y-1 text-sm">
                                    {guide.donts.map((d, i) => <li key={i}>• {d}</li>)}
                                </ul>
                            </div>
                        </div>

                        <div className="bg-amber-50 dark:bg-amber-900/10 border-l-4 border-amber-500 p-4">
                            <h4 className="font-bold text-amber-800 flex items-center gap-2 mb-1">
                                <AlertOctagon className="w-4 h-4" /> When to Call Help
                            </h4>
                            <p className="text-sm text-amber-900">{guide.whenToCall}</p>
                        </div>

                        <a href="tel:112" className="block w-full">
                            <Button className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90" size="lg">
                                <Phone className="w-5 h-5 mr-2" /> Call Emergency (112)
                            </Button>
                        </a>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
