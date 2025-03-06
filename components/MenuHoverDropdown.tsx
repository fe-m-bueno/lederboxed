'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';

interface MenuHoverDropdownProps {
  title: string;
  items: { label: string; href: string }[];
}

export default function MenuHoverDropdown({
  title,
  items,
}: MenuHoverDropdownProps) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="shadow-sm border border-foreground/10 rounded-lg">
            {title}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="w-full bg-background p-2 rounded-lg shadow-lg">
            <div className="flex flex-col gap-2">
              {items.map((item) => (
                <NavigationMenuLink asChild key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:bg-accent px-3 py-2 rounded-md text-nowrap"
                  >
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
