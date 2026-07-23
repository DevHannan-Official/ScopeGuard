"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { useScope } from "../stores/useScope";

const AppSection = () => {
  const form = useForm<promptSchemaType>({
    resolver: zodResolver(promptSchema),
    defaultValues: {
      originalScope: "",
      clientRequest: "",
    },
  });
  const { result, setResult } = useScope();
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

  async function onSubmit(values: promptSchemaType) {
    setIsSubmitting(true);
    const result = await analyzeScopeAction(
      values.originalScope,
      values.clientRequest,
    );
    setResult(result);

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
            disabled={isSubmitting}
          >
            <Sparkles /> Check Scope
          </Button>
          <CardDescription className="flex items-center gap-1.5 self-center text-center mt-3 text-xs justify-center">
            <LockKeyhole size={14} /> No signup required. Your data is not
            stored.
          </CardDescription>
        </form>
      </Card>
      {!!result && (
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
              </TabsList>
              <TabsContent value={"result"} className={"py-4"}>
                <div className="flex items-center justify-between">
                  <div className="py-2 px-3 bg-red-500/5 rounded-full border border-red-600/10 text-red-600 flex items-center gap-1.5 w-fit">
                    <XCircle size={18} />{" "}
                    <span className="capitalize text-base font-medium">
                      {result?.verdict}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="py-3 px-4 bg-muted w-full max-w-36 rounded-lg border  flex items-center gap-3">
                      <ShieldCheck size={24} />
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">
                          Risk Level
                        </span>
                        <p className="text-base font-medium">
                          {result?.riskLevel}
                        </p>
                      </div>
                    </div>
                    <div className="py-3 px-4 bg-muted w-full max-w-36 rounded-lg border  flex items-center gap-3">
                      <ChartNoAxesCombined size={24} />
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">
                          Confidence
                        </span>
                        <p className="text-base font-medium">
                          {result?.confidence}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {result?.verdict === "INSIDE_SCOPE"
                    ? `This request includes ${result?.items.length} additions that are covered in your original scope`
                    : result?.verdict === "NEEDS_DISCUSSION"
                      ? `This request includes ${result?.items.length} additions that needs discussion`
                      : `This request includes ${result?.items.length} additions that are not covered in your original scope`}
                </p>
                <div className="flex flex-col mt-6 gap-2">
                  {result.items.map((item, i) => (
                    <div
                      key={i}
                      className={cn(
                        "py-4 px-6 flex items-center justify-between bg-background rounded-lg border",
                        i > 0 && "border-t",
                      )}
                    >
                      <div className="flex items-center gap-6">
                        <span className="size-10 bg-background rounded-lg font-semibold border text-center flex items-center justify-center">
                          {i + 1}
                        </span>
                        <div>
                          <h5 className="text-sm font-medium text-ellipsis max-w-96 overflow-hidden line-clamp-1">
                            {item.title}
                          </h5>
                          <p className="text-xs text-muted-foreground max-w-96 text-ellipsis line-clamp-2 overflow-hidden">
                            {item.reason}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground text-nowrap w-full">
                          Est. Add-on
                        </span>
                        <div className="px-2 py-1.5 bg-red-500/5 text-red-600 w-full max-w-fit border text-nowrap border-red-600/10 rounded-full">
                          ${item.priceMin} - ${item.priceMax}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 mt-6 flex items-center justify-around bg-red-500/5 border rounded-lg border-red-600/10">
                  <div className="flex flex-col items-center justify-center flex-1">
                    <p className="text-xs">Estimated Total Add-on</p>
                    <h4 className="text-lg font-semibold">
                      {result?.estimatedPrice.currency}
                      {result?.estimatedPrice.min} -{" "}
                      {result?.estimatedPrice.currency}
                      {result?.estimatedPrice.max}
                    </h4>
                  </div>
                  <Separator orientation="vertical" />
                  <div className="flex flex-col items-center justify-center flex-1">
                    <p className="text-xs">Timeline Extension</p>
                    <h4 className="text-lg font-semibold">
                      +{result?.timelineExtension}
                    </h4>
                  </div>
                </div>
                <div className="mt-4 py-3 px-6 rounded-lg border rounded-b-none bg-background flex items-center justify-between">
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
                    <Button
                      variant={"outline"}
                      size={"lg"}
                      className={"w-full"}
                      onClick={async (e) =>
                        await navigator.clipboard.writeText(result?.email)
                      }
                    >
                      <Copy /> Copy Email
                    </Button>
                    <ChevronDown size={16} />
                  </div>
                </div>
                <Textarea
                  contentEditable={false}
                  className="min-h-46 rounded-t-none border-t-0 px-6 py-4"
                  placeholder="Generated mail/message..."
                  value={result?.email}
                />
              </TabsContent>
              <TabsContent value={"breakdown"} className={"py-4"}>
                <CardTitle>Add-ons</CardTitle>
                <div className="flex flex-col mt-2 gap-2">
                  {result.items.map((item, i) => (
                    <div
                      key={i}
                      className={cn(
                        "py-4 px-6 flex items-center justify-between bg-background rounded-lg border",
                        i + 1 === result.items.length &&
                          "border-b-0 rounded-b-none",
                      )}
                    >
                      <div className="flex items-center gap-6">
                        <span className="size-10 rounded-lg font-semibold border text-center flex items-center justify-center">
                          {i + 1}
                        </span>
                        <div>
                          <h5 className="text-sm font-medium text-ellipsis max-w-96 overflow-hidden line-clamp-1">
                            {item.title}
                          </h5>
                          <p className="text-xs text-muted-foreground max-w-96 text-ellipsis line-clamp-2 overflow-hidden">
                            {item.reason}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground text-nowrap w-full">
                          Est. Add-on
                        </span>
                        <div className="px-2 py-1.5 bg-red-500/5 text-red-600 w-full max-w-fit border text-nowrap border-red-600/10 rounded-full">
                          ${item.priceMin} - ${item.priceMax}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 flex items-center justify-around bg-red-500/5 border rounded-lg rounded-t-none border-red-600/10">
                  <div className="flex flex-col items-center justify-center flex-1">
                    <p className="text-xs">Estimated Total Add-on</p>
                    <h4 className="text-lg font-semibold">
                      {result?.estimatedPrice.currency}
                      {result?.estimatedPrice.min} -{" "}
                      {result?.estimatedPrice.currency}
                      {result?.estimatedPrice.max}
                    </h4>
                  </div>
                  <Separator orientation="vertical" />
                  <div className="flex flex-col items-center justify-center flex-1">
                    <p className="text-xs">Timeline Extension</p>
                    <h4 className="text-lg font-semibold">
                      +{result?.timelineExtension}
                    </h4>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className=" flex-1 bg-muted flex items-center justify-between px-6 py-4">
            <span className="text-muted-foreground">
              Generated by ScopeGuard
            </span>
            <ShieldCheck size={20} />
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default AppSection;
