"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import { useApplicationModal } from "@/hooks/use-application-modal";
import { Modal } from "@/components/ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});

export const ApplicationModal = () => {
  const applicationModal = useApplicationModal();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
          setLoading(true);
          const response = await axios.post('/api/applications', values);

          window.location.assign(`/${response.data.id}`);
      } catch (error) {
        toast.error("Something went wrong.");
      } finally {
          setLoading(false);
      }
    // TODO: Create Store
  };

  return (
    <Modal
      title="Create Application"
      description="Add a new application to manage products and usage"
      isOpen={applicationModal.isOpen}
      onClose={applicationModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                            <Input disabled={ loading } placeholder="Application" {...field} />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                            <Input disabled={ loading } placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                              <Button disabled={ loading } variant="outline" onClick={applicationModal.onClose}>
                  Cancel
                </Button>
                              <Button disabled={loading }type="submit">Continue</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
