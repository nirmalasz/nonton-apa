import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="w-full bg-[#F9FBFD] border-t-[1.5px] border-[#8FBFDC] py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">

                <div className="flex items-center gap-2 text-[#0A1116]">
                    <span className="font-bold tracking-tight">NontonApa.</span>
                    <span className="text-sm text-[#0A1116]">© Made by group 8 morning class for database system final project .</span>
                </div>

                <div className="flex items-center gap-6">
                    <a
                        href="https://github.com/nirmalasz/nonton-apa"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#8FBFDC] hover:text-[#4590BC] transition-colors flex items-center gap-2"
                        aria-label="GitHub Repository"
                    >
                        <span className="text-sm font-medium">View Source</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24" height="24"
                            viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        >
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
}