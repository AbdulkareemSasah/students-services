import {Card, CardContent} from "@/components/dashboard/ui/card";
import {ScrollArea} from "@/components/dashboard/ui/scroll-area";

export default function Block() {

    return (
        <>
            <Card>
                <CardContent className={"flex flex-row gap-3 overflow-x-scroll"}>
                    <Card className={"bg-amber-400"}>
                            <CardContent>
                                <p>Card Content</p>
                            </CardContent>
                        </Card>
                        <Card className={"bg-amber-400"}>
                            <CardContent>
                                <p>Card Content</p>
                            </CardContent>
                        </Card>
                        <Card className={"bg-amber-400"}>
                            <CardContent>
                                <p>Card Content</p>
                            </CardContent>
                        </Card>
                        <Card className={"bg-amber-400"}>
                            <CardContent>
                                <p>Card Content</p>
                            </CardContent>
                        </Card>
                        <Card className={"bg-amber-400"}>
                            <CardContent>
                                <p>Card Content</p>
                            </CardContent>
                        </Card>
                        <Card className={"bg-amber-400"}>
                            <CardContent>
                                <p>Card Content</p>
                            </CardContent>
                        </Card>
                </CardContent>
            </Card>
        </>
    )
}