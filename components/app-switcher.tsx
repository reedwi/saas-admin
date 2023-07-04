"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useApplicationModal } from "@/hooks/use-application-modal"; 
import { Application } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList, 
  CommandSeparator
} from "@/components/ui/command";



type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface AppSwitcherProps extends PopoverTriggerProps {
  items: Application[];
}

export default function AppSwitcher({
  className,
  items = []
}: AppSwitcherProps ) {
  const applicationModal = useApplicationModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id
  }));

  const currentApplication = formattedItems.find((item) => item.value === params.applicationId);

  const [open, setOpen] = useState(false);

  const onApplicationSelect = (application: { value: string, label: string }) => {
    setOpen(false);
    router.push(`/${application.value}`);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select an app"
          className={cn("w-[200px] justify-between", className)}
        >
          <StoreIcon className="mr-2 h-4 w-4"/>
          {currentApplication?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50"/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search application..." />
            <CommandEmpty>No app found.</CommandEmpty>
            <CommandGroup heading="Apps">
              {formattedItems.map((application) => (
                <CommandItem
                  key={application.value}
                  onSelect={() => onApplicationSelect(application)}
                  className="text-sm"
                >
                  <StoreIcon className="mr-2 h-4 w-4"/>
                  {application.label}
                  <Check 
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentApplication?.value === application.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  applicationModal.onOpen();
                }}
              >
                <PlusCircle className="mr-2 h-5 w-f"/>
                Create Application
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}