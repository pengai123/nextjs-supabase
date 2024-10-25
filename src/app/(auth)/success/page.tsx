import Link from "next/link"
export default function Page() {
  return <div className="flex flex-col justify-center items-center gap-4 p-4">
    <h2 className="text-lg font-medium text-green-600">Success</h2>
    <p className="text-sm">If you're trying to reset your password, an email has been sent to your email.</p>
    <p className="text-sm">Back to <Link className="underline" href="/">Home</Link></p>
  </div>
}