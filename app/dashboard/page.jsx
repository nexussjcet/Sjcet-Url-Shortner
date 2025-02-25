"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";
import { BellIcon, Icon, Share2Icon } from "lucide-react";
import { CalendarIcon, FileTextIcon } from "@radix-ui/react-icons";
import { FloatingDock } from "@/components/ui/floating-dock";
import { BentoGrid, BentoCard } from "@/components/magicui/bento-grid";

export default function Dashboard() {
  // const { data: session } = useSession();
  const [urls, setUrls] = useState([]);

  // useEffect(() => {
  //   if (session) {
  //     fetchUrls();
  //   }
  // }, [session]);

  const fetchUrls = async () => {
    const { data, error } = await supabase
      .from("shortened_urls")
      .select("*")
      .eq("user_id", session.user.id);

    if (data) setUrls(data);
  };

  // if (!session) return <p>Please log in to view your shortened URLs.</p>;

  const features = [
    {
      Icon: FileTextIcon,
      name: "Save your files",
      description: "We automatically save your files as you type.",
      href: "#",
      cta: "Learn more",
      className: "col-span-3 lg:col-span-1",
    },
    {
      Icon: BellIcon,
      name: "Notifications",
      description: "Get notified when something happens.",
      href: "#",
      cta: "Learn more",
      className: "col-span-3 lg:col-span-2",
    },
    {
      Icon: Share2Icon,
      name: "Integrations",
      description: "Supports 100+ integrations and counting.",
      href: "#",
      cta: "Learn more",
      className: "col-span-3 lg:col-span-2",
    },
    {
      Icon: CalendarIcon,
      name: "Calendar",
      description: "Use the calendar to filter your files by date.",
      className: "col-span-3 lg:col-span-1",
      href: "#",
      cta: "Learn more",
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold justify-center ">Your Shortened URLs</h2>
      <br/>
      <BentoGrid>
        {features.map((feature, idx) => (
          <BentoCard key={idx} {...feature} />
        ))}
      </BentoGrid>
      <div className="fixed bottom-6 left-0 right-0 flex justify-center px-4 md:px-8">
        <FloatingDock
          className="w-full max-w-3xl"
          itemClassName="p-3 md:p-4"
          iconClassName="w-6 h-6 md:w-7 md:h-7"
          items={links}
        />
      </div>
    </div>
  );
}

const links = [
  {
    title: "Home",
    icon: (
      <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/",
  },
  {
    title: "GitHub",
    icon: (
      <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "https://github.com",
  },
  {
    title: "Twitter",
    icon: (
      <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "https://twitter.com",
  },
  {
    title: "Exchange",
    icon: (
      <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/exchange",
  },
  {
    title: "New Section",
    icon: (
      <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/new-section",
  },
  {
    title: "Terminal",
    icon: (
      <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/terminal",
  },
];
