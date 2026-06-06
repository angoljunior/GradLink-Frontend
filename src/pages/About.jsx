import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const items = [
  {
    value: "item-1",
    trigger: "How do I reset my password?",
    content:
      "Click on 'Forgot Password' on the login page, enter your email address, and we'll send you a link to reset your password. The link will expire in 24 hours.",
  },
  {
    value: "item-2",
    trigger: "Can I change my subscription plan?",
    content:
      "Yes, you can upgrade or downgrade your plan at any time from your account settings. Changes will be reflected in your next billing cycle.",
  },
  {
    value: "item-3",
    trigger: "What payment methods do you accept?",
    content:
      "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our payment partners.",
  },
  {
    value: "item-3",
    trigger: "What payment methods do you accept?",
    content:
      "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our payment partners.",
  },
  
]

const About = () => {
  return (
    <div>
     <>
            <br></br>


            <h1 className="text-3xl font-semibold text-center mx-auto">About Us</h1>
            <p className="text-sm text-slate-500 text-center mt-2 max-w-md mx-auto">
                A visual collection of our most recent works - each piece crafted with intention, emotion and style.
            </p>
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 px-4 md:px-0 py-10">
                <div className="size-[520px] rounded-full absolute blur-[300px] -z-10 bg-[#FBFFE1]"></div>
                <img className="max-w-sm w-full rounded-xl h-auto"
                    src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&w=830&h=844&auto=format&fit=crop"
                    alt="" />
                <div>
                    <h1 className="text-3xl font-semibold">Frequently Asked Questions</h1>
                    <p className="text-sm text-slate-500 mt-2">
                        Ship Beautiful Frontends Without the Overhead — Customizable, Scalable and Developer-Friendly UI
                        Components.
                    </p>
            
                     <Accordion
                        type="single"
                        collapsible
                        defaultValue="item-1"
                        className="max-w-lg"
                        >
                        {items.map((item) => (
                            <AccordionItem  key={item.value} value={item.value}>
                            <AccordionTrigger  className="text-slate-500" >{item.trigger}</AccordionTrigger>
                            <AccordionContent>{item.content}</AccordionContent>
                            </AccordionItem>
                        ))}
                     </Accordion>

                    {/* 
                    <div className="flex flex-col gap-10 mt-6">
                        <div className="flex items-center gap-4">
                            <div className="size-9 p-2 bg-indigo-50 border border-indigo-200 rounded">
                                <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/flashEmoji.png" alt="" />
                            </div>
                            <div>
                                <h3 className="text-base font-medium text-slate-600">Lightning-Fast Performance</h3>
                                <p className="text-sm text-slate-500">Built with speed — minimal load times and optimized.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="size-9 p-2 bg-indigo-50 border border-indigo-200 rounded">
                                <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/colorsEmoji.png" alt="" />
                            </div>
                            <div>
                                <h3 className="text-base font-medium text-slate-600">Beautifully Designed Components</h3>
                                <p className="text-sm text-slate-500">Modern, pixel-perfect UI components ready for any project.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="size-9 p-2 bg-indigo-50 border border-indigo-200 rounded">
                                <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/puzzelEmoji.png" alt="" />
                            </div>
                            <div>
                                <h3 className="text-base font-medium text-slate-600">Plug-and-Play Integration</h3>
                                <p className="text-sm text-slate-500">Simple setup with support for React, Next.js and Tailwind css.</p>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    </div>
  )
}

export default About




