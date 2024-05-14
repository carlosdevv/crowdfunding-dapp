"use client";
import { Icons } from "@/components/icons";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateCampaign } from "./use-create-campaign";

const CreateCampaign = () => {
  const { isLoading, onSubmit, form } = useCreateCampaign();
  
  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Start a Campaign
        </h1>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full mt-[65px] flex flex-col gap-[30px]"
        >
          <div className="flex flex-wrap gap-[40px]">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Your Name *</FormLabel>
                  <FormControl>
                    <Input className="border-slate-400 text-white" placeholder="John Doe" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Campaign Title *</FormLabel>
                  <FormControl>
                    <Input className="border-slate-400 text-white" placeholder="Write a title" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Story *</FormLabel>
                <FormControl>
                  <Input className="border-slate-400 text-white" placeholder="Write your story" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full flex justify-start items-center p-4 bg-slate-800 rounded-[10px]">
            <Icons.payment className="w-[40px] h-[40px] object-contain text-[#1dc071]" />
            <h4 className="font-epilogue font-bold text-sm text-white ml-[20px]">
              You will get 100% of the raised amount
            </h4>
          </div>

          <div className="flex flex-wrap gap-[40px]">
            <FormField
              control={form.control}
              name="target"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Goal *</FormLabel>
                  <FormControl>
                    <Input className="border-slate-400 text-white" placeholder="ETH 0.50" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">End Date *</FormLabel>
                  <FormControl>
                    <Input className="border-slate-400 text-white" placeholder="End Date" type="date" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Campaign image *</FormLabel>
                <FormControl>
                  <Input className="border-slate-400 text-white"
                    placeholder="Place image URL of your campaign"
                    type="url"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center items-center mt-[40px]">
            <Button type="submit" className="bg-[#1dc071]">
              Submit new campaign
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateCampaign;
