import Link from "next/link"
import Image from 'next/image'

export default function Footer() {
  const navigationItems = [
    {
      title: "Quick Links",
      description: "",
      items: [
        {
          title: "Home",
          href: "/",
        },
        {
          title: "Log in",
          href: "/login",
        },
        {
          title: "Sign up",
          href: "/signup",
        },
        {
          title: "Account",
          href: "/account",
        },
        {
          title: "Profile",
          href: "/profile",
        },
      ]
    },
    {
      title: "Services",
      description: "Managing a small business today is already tough.",
      items: [
        {
          title: "Website design",
          href: "",
        },
        {
          title: "Website hosting",
          href: "",
        },
        {
          title: "Domain setup",
          href: "",
        },
        {
          title: "Business Email setup",
          href: "",
        },
      ],
    },
    {
      title: "Company",
      description: "Managing a small business today is already tough.",
      items: [
        {
          title: "About us",
          href: "/services",
        },
        {
          title: "Services",
          href: "/services",
        },
        {
          title: "FAQ",
          href: "/faq",
        },
        {
          title: "Contact us",
          href: "/contact",
        },
      ],
    },
  ];

  const year = new Date().getFullYear()

  return (
    <section className="w-full py-8 bg-foreground text-background">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="flex gap-8 flex-col items-start">
            <div className="flex gap-2 flex-col items-start">
              {/* <h2 className="text-2xl md:text-4xl tracking-tighter max-w-xl font-regular text-left">
                Hotlink Studio
              </h2> */}
              <Link href="/" className="inline-block w-[140px] h-[56px] relative">
                <Image
                  src="/logo2.png"
                  alt="logo"
                  fill
                  sizes="(max-width: 768px) 100vw, 140px"
                  className="object-contain"
                  unoptimized
                />
              </Link>
              <p className="max-w-lg leading-relaxed tracking-tight text-background/65 text-left">
                Connect you to the web, one hotlink at a time.
              </p>
            </div>
            <div className="flex gap-20 flex-row">
              {/* <div className="flex flex-col text-sm max-w-lg leading-relaxed tracking-tight text-background/65 text-left">
                <p>123 Example St</p>
                <p>City</p>
                <p>AZ 123123</p>
              </div> */}
              <div className="flex flex-col text-sm max-w-lg leading-relaxed tracking-tight text-background/65 text-left">
                <Link href="/terms" className="hover:text-custom-blue">Terms of service</Link>
                <Link href="/privacy-policy" className="hover:text-custom-blue">Privacy Policy</Link>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-10 items-start">
            {navigationItems.map((item) => (
              <div
                key={item.title}
                className="flex text-base gap-1 flex-col items-start"
              >
                <div className="flex flex-col gap-2">
                  <p className="text-lg">{item.title}</p>
                  {item.items &&
                    item.items.map((subItem) => (
                      subItem.href ?
                        (
                          <Link
                            key={subItem.title}
                            href={subItem.href}
                            className="flex justify-between items-center"
                          >
                            <span className="text-background/65 text-sm hover:text-custom-blue">
                              {subItem.title}
                            </span>
                          </Link>
                        ) : (
                          <p key={subItem.title} className="text-background/65 text-sm">{subItem.title}</p>
                        )
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 border-t pt-4 border-muted-foreground text-sm text-muted-foreground flex justify-center">
          <p>© {year} <Link href="/" className="hover:underline">Hotlink Studio</Link>. All rights reserved.</p>
          {/* <p>Powered By <Link href="https://www.hotlinkstudio.com/" target="_blank" className="hover:underline">Hotlink Studio</Link>.</p> */}
        </div>
      </div>
    </section>
  );
};