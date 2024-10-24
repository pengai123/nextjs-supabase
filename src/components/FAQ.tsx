import { MessageSquareText } from "lucide-react";
import Link from "next/link"
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "What is the monthly charge, and what does it include?",
    answer: "The monthly package is $45. This fee covers essential services, including reliable website hosting to keep your site running smoothly, regular server maintenance to ensure optimal performance, and domain registration or renewal to maintain your online presence. Additionally, the package includes an SSL certificate, which encrypts your site’s data for security and helps boost your credibility with visitors. We are also available for troubleshooting and minor updates, making this a comprehensive solution for maintaining your website."
  },
  {
    question: "What is included in your website design and development services?",
    answer: "Our website design and development services include creating a fully customized website based on your business needs. This includes design layout, responsive design (mobile-friendly), user experience optimization, content integration, and more. We also offer ongoing maintenance and support to ensure your site runs smoothly."
  },
  {
    question: "How long does it take to design and build a website?",
    answer: "The timeline varies depending on the complexity and scope of the project. A basic website can take 2-4 weeks, while more complex websites with custom features or eCommerce functionality may take 6-8 weeks or more. We will provide a detailed timeline after discussing your project."
  },
  {
    question: "Will my website be mobile-friendly?",
    answer: "Yes, all websites we design are fully responsive and mobile-friendly. We ensure your site looks great and functions well on all devices, including smartphones and tablets."
  },
  {
    question: "Can you update or redesign my existing website?",
    answer: "Absolutely! We can either refresh your current website with a new design or completely rebuild it to better meet your needs. We will assess your current site and suggest the best approach to achieve your goals."
  },
  {
    question: "Do I need to provide content for the website?",
    answer: "While it’s helpful if you can provide your own content (text, images, etc.), we offer content creation services, including copywriting and sourcing professional images, to help build your website."
  },
  {
    question: "What is website hosting, and why do I need it?",
    answer: "Website hosting is the service that allows your website to be accessible on the internet. It stores your website's files on a server and makes them available to users when they visit your domain. Without hosting, your website would not be visible online."
  },
  {
    question: "Is website hosting secure?",
    answer: "Yes, we take security seriously. Our hosting services come with SSL certificates for encrypted data transfer, regular security updates, firewall protection, and automated backups to safeguard your website."
  },
  {
    question: "What is a domain name, and why do I need one?",
    answer: "A domain name is the address users type into their browser to visit your website (e.g., www.yourbusiness.com). It’s essential for having an online presence, as it represents your brand and makes it easy for people to find you online."
  },
  {
    question: "Can you help me register a domain name?",
    answer: "Yes, we can assist you with registering a domain name that fits your business. We will check the availability of your desired name and complete the registration process on your behalf."
  },
  {
    question: "How long does it take for a new domain to be active?",
    answer: "Once registered, domains are typically active within 24-48 hours. However, the DNS propagation process may take up to 72 hours, during which time the domain will fully propagate across the internet."
  },
]

export default function FAQ() {
  return (
    <section className="w-full py-16 lg:py-32">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex text-center justify-center items-center gap-4 flex-col">
            <Badge variant="outline" className="text-primary">FAQ</Badge>
            <div className="flex gap-2 flex-col">
              <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-regular">
                Frequently Asked Questions
              </h4>
              <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-center">
                Clear Answers to Help You Navigate Our Services for a Seamless Online Experience
              </p>
            </div>
          </div>
          <div className="max-w-3xl w-full mx-auto flex flex-col items-center gap-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, idx) => (
                <AccordionItem key={faq.question} value={"index-" + idx}>
                  <AccordionTrigger className="text-start">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <Button asChild className="gap-4">
              <Link href="/contact">
                More questions? Reach out <MessageSquareText className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}