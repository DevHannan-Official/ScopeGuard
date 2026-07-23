"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  ChartNoAxesCombined,
  ChevronDown,
  Copy,
  FileText,
  Frame,
  List,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  XCircle,
} from "lucide-react";
import { analyzeScopeAction } from "../actions/analyze-scope";
import { Controller, useForm } from "react-hook-form";
import { promptSchema, promptSchemaType } from "../lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useState } from "react";

const AppSection = () => {
  const form = useForm<promptSchemaType>({
    resolver: zodResolver(promptSchema),
    defaultValues: {
      originalScope: "",
      clientRequest: "",
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const listItems = [
    {
      title: "E-commerce section with checkout flow",
      desc: "Not mentioned in scope. This is a significant feature.",
      from: 800,
      to: 2400,
    },
    {
      title: "Team page",
      desc: "Your scope covers 5 specific pages. This is page 6.",
      from: 150,
      to: 300,
    },
    {
      title: "Careers page",
      desc: "Your scope covers 5 specific pages. This is page 7.",
      from: 150,
      to: 300,
    },
  ];
  const getTotalRange = () => {
    let totalFrom = 0;
    listItems.forEach((item) => {
      totalFrom += item.from;
    });

    let totalTo = 0;
    listItems.forEach((item) => {
      totalTo += item.to;
    });

    return { totalFrom, totalTo };
  };

  async function onSubmit(values: promptSchemaType) {
    setIsSubmitting(true);
    const result = await analyzeScopeAction(
      values.originalScope,
      values.clientRequest,
    );

    setIsSubmitting(false);

    console.log(result);
  }
  return (
    <div className="w-full min-h-96 p-4 flex items-start justify-center bg-muted gap-6">
      <Card className="w-full max-w-xl px-6">
        <form id="form-scopes" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup></FieldGroup>
          <FieldGroup>
            <Controller
              name="originalScope"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-scopes-original-scope">
                    1. Original Scope
                  </FieldLabel>
                  <Textarea
                    {...field}
                    aria-invalid={fieldState.invalid}
                    maxLength={3000}
                    placeholder={`Design a 5-page website in Figma.\nIncludes: homepage, about, services, contact, blog.\n2 rounds of revisions included.\n\nTimeline: 3 weeks.`}
                    className="min-h-46"
                    id="form-scopes-original-scope"
                  />
                  <FieldDescription>
                    Paste your agreed scope, SOW, or contract details.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="clientRequest"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-scopes-client-request">
                    2. Client's New Request
                  </FieldLabel>
                  <Textarea
                    {...field}
                    aria-invalid={fieldState.invalid}
                    maxLength={3000}
                    placeholder={`Hey, can you also add an e-commerce section with product listings and a checkout flow? Also, the CEO wants a team page and a careers page.\n\nLet me know if that works!`}
                    className="min-h-46"
                    id="form-scopes-client-request"
                  />
                  <FieldDescription>
                    Paste the new request from your client.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <Button
            size={"xl"}
            type="submit"
            form="form-scopes"
            className={"w-full mt-4"}
            isLoading={isSubmitting}
            loadingText="Checking..."
          >
            <Sparkles /> Check Scope
          </Button>
          <CardDescription className="flex items-center gap-1.5 self-center text-center mt-3 text-xs justify-center">
            <LockKeyhole size={14} /> No signup required. Your data is not
            stored.
          </CardDescription>
        </form>
      </Card>
      <Card className="w-full max-w-2xl pb-0">
        <CardContent className="px-6">
          <Tabs>
            <TabsList className={"w-full"} variant={"line"}>
              <TabsTrigger value={"result"}>
                <Frame /> Analysis Result
              </TabsTrigger>
              <TabsTrigger value={"breakdown"}>
                <List /> Breakdown
              </TabsTrigger>
              <TabsTrigger value={"summary"}>
                <FileText /> Summary
              </TabsTrigger>
            </TabsList>
            <TabsContent value={"result"} className={"py-4"}>
              <div className="flex items-center justify-between">
                <div className="py-2 px-3 bg-red-500/5 rounded-full border border-red-600/10 text-red-600 flex items-center gap-1.5 w-fit">
                  <XCircle size={18} />{" "}
                  <span className="capitalize text-base font-medium">
                    OUT OF STOCK
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="py-3 px-4 bg-muted w-full max-w-36 rounded-lg border  flex items-center gap-3">
                    <ShieldCheck size={24} />
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">
                        Risk Level
                      </span>
                      <p className="text-base font-medium">High</p>
                    </div>
                  </div>
                  <div className="py-3 px-4 bg-muted w-full max-w-36 rounded-lg border  flex items-center gap-3">
                    <ChartNoAxesCombined size={24} />
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">
                        Confidence
                      </span>
                      <p className="text-base font-medium">92%</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                This request includes 3 additions not covered in your original
                scope.
              </p>
              <div className="flex flex-col mt-6">
                {listItems.map((item, i) => (
                  <div
                    key={i}
                    className={cn(
                      "py-4 px-6 border-t flex items-center justify-between",
                      i + 1 === listItems.length && "border-b",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="size-10 rounded-lg font-semibold border text-center flex items-center justify-center">
                        {i + 1}
                      </span>
                      <div>
                        <h5 className="text-sm font-medium">{item.title}</h5>
                        <p className="text-xs text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        Est. Add-on
                      </span>
                      <div className="px-2 py-1.5 bg-red-500/5 text-red-600 border border-red-600/10 rounded-full">
                        ${item.from} - ${item.to}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 mt-6 flex items-center justify-around bg-red-500/5 border rounded-lg border-red-600/10">
                <div className="flex flex-col items-center justify-center flex-1">
                  <p className="text-xs">Estimated Total Add-on</p>
                  <h4 className="text-lg font-semibold">
                    ${getTotalRange().totalFrom} - ${getTotalRange().totalTo}
                  </h4>
                </div>
                <Separator orientation="vertical" />
                <div className="flex flex-col items-center justify-center flex-1">
                  <p className="text-xs">Timeline Extension</p>
                  <h4 className="text-lg font-semibold">+1 week</h4>
                </div>
              </div>
              <div className="mt-4 p-3 rounded-lg border bg-background flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail />
                  <div className="flex flex-col">
                    <h5 className="text-sm font-medium">
                      Ready-to-Send Response
                    </h5>
                    <p className="text-xs text-muted-foreground">
                      Professional email you can copy and sent to your client.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant={"outline"} size={"lg"} className={"w-full"}>
                    <Copy /> Copy Email
                  </Button>
                  <ChevronDown size={16} />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className=" flex-1 bg-muted flex items-center justify-between px-6 py-4">
          <span className="text-muted-foreground">Generated by ScopeGuard</span>
          <ShieldCheck size={20} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default AppSection;
