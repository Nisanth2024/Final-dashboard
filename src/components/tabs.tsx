import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & { language?: 'en' | 'es' | 'fr', setLanguage?: (lang: 'en' | 'es' | 'fr') => void }
>((props, ref) => (
  <TabsPrimitive.Root ref={ref} {...props} />
))
Tabs.displayName = "Tabs"

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & { language?: 'en' | 'es' | 'fr', setLanguage?: (lang: 'en' | 'es' | 'fr') => void }
>((props, ref) => (
  <TabsPrimitive.List ref={ref} {...props} />
))
TabsList.displayName = "TabsList"

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & { language?: 'en' | 'es' | 'fr', setLanguage?: (lang: 'en' | 'es' | 'fr') => void }
>((props, ref) => (
  <TabsPrimitive.Trigger ref={ref} {...props} />
))
TabsTrigger.displayName = "TabsTrigger"

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & { language?: 'en' | 'es' | 'fr', setLanguage?: (lang: 'en' | 'es' | 'fr') => void }
>((props, ref) => (
  <TabsPrimitive.Content ref={ref} {...props} />
))
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent } 