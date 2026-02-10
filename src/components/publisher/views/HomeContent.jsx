import { constant } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

const FormSection = ({ title, children, onSubmit, isSubmitting }) => (
    <section className="space-y-6 bg-white p-2 md:p-6 rounded-lg border border-gray-100 shadow-sm transition-all hover:shadow-md">
        <div className="border-b-2 border-primary pb-2">
            <h2 className="text-xl font-bold text-primary-blue">{title}</h2>
        </div>
        <form onSubmit={onSubmit} className="space-y-6">
            {children}
            <div className="flex justify-center">
                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="bg-primary hover:opacity-90 text-white font-bold py-2 px-10 rounded text-sm transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        'Submit'
                    )}
                </button>
            </div>
        </form>
    </section>
);

const HomeContent = () => {
    // Section 1 Form: Content
    const { register: regContent, handleSubmit: subContent, reset: resetContent, formState: { isSubmitting: isSubmittingContent } } = useForm({
        defaultValues: { title: '', content: '' }
    });

    // Section 2 Form: Icons
    const { register: regIcon, handleSubmit: subIcon, reset: resetIcon, formState: { isSubmitting: isSubmittingIcon } } = useForm({
        defaultValues: {
            iconLink: '',
            iconFile: null
        }
    });

    // Section 3 Form: Marquee
    const { register: regMarquee, handleSubmit: subMarquee, reset: resetMarquee, formState: { isSubmitting: isSubmittingMarquee } } = useForm({
        defaultValues: { marqueeText: '', marqueeLink: '' }
    });

    // Section 4 Form: Impact
    const { register: regImpact, handleSubmit: subImpact, reset: resetImpact, formState: { isSubmitting: isSubmittingImpact } } = useForm({
        defaultValues: { impactFactor: '' }
    });

    useEffect(() => {
        const fetchExistingSettings = async () => {
            try {
                const response = await axios.get(`${constant.SERVER_URL}public/settings`, { withCredentials: true });
                if (response.data.success && response.data.data) {
                    const s = response.data.data;
                    resetContent({ title: s.title || '', content: s.content || '' });
                    resetIcon({ iconLink: s.iconLink || '' });
                    resetMarquee({ marqueeText: s.marqueeText || '', marqueeLink: s.marqueeLink || '' });
                    resetImpact({ impactFactor: s.impactFactor || '' });
                }
            } catch (error) {
                console.error("Error fetching settings:", error);
            }
        };
        fetchExistingSettings();
    }, [resetContent, resetIcon, resetMarquee, resetImpact]);

    const submitData = async (data, isMultipart = false) => {
        try {
            console.log(data)
            let payload = data;
            if (isMultipart) {
                payload = new FormData();

                if (data.iconFile && data.iconFile.length > 0) {
                    payload.append('iconFile', data.iconFile[0]);
                }

                // Append the link
                if (data.iconLink) {
                    payload.append('iconLink', data.iconLink);
                }
            } else {
                // For marquee, map 'text' to 'marqueeText' and 'link' to 'marqueeLink' if it's the marquee section
                // But wait, it's better to just use the correct names in useForm
            }

            const response = await axios.post(
                `${constant.SERVER_URL}admin/settings`,
                payload,
                { withCredentials: true }
            );
            console.log(response)

            if (response.data.success) {
                toast.success(response.data.message || 'Settings updated successfully');
            } else {
                toast.error(response.data.message || 'Failed to update settings');
            }
        } catch (error) {
            console.error('Submission error:', error);
            const errorMsg = error.response?.data?.message || error.message || 'An error occurred';
            toast.error(errorMsg);
        }
    };

    const onContentSubmit = (data) => submitData(data);
    const onIconSubmit = (data) => submitData(data, true);
    const onMarqueeSubmit = (data) => submitData(data);
    const onImpactSubmit = (data) => submitData(data);

    return (
        <div className="max-w-6xl mx-auto   space-y-12  rounded-xl">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-1 flex-1">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800">Home Page Settings</h1>
                    <p className="text-gray-500 text-xs md:text-sm">Configure various components of the public home page.</p>
                </div>
                <div className="bg-primary-blue/10 text-primary-blue px-2 md:px-4 py-2 rounded-lg text-xs font-bold border border-primary-blue/20">
                    Publisher View
                </div>
            </div>

            {/* Section 1: Insert Home Page Content */}
            <FormSection
                title="Insert Home Page Content"
                onSubmit={subContent(onContentSubmit)}
                isSubmitting={isSubmittingContent}
            >
                <div className="space-y-4">
                    <div className="space-y-1">
                        <label className="block text-sm font-bold text-gray-700">
                            <span className="text-danger font-bold">*</span> Title Text
                        </label>
                        <input
                            {...regContent('title', { required: true })}
                            type="text"
                            placeholder="e.g. Welcome to Research Publication..."
                            className="w-full border border-border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-all bg-white"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-bold text-gray-700">
                            <span className="text-danger font-bold">*</span> Content
                        </label>
                        <textarea
                            {...regContent('content', { required: true })}
                            rows="6"
                            placeholder="Enter the main description for the home page..."
                            className="w-full border border-border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-all bg-white"
                        />
                    </div>
                </div>

                {/* Examples */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-xs bg-muted/50 p-4 rounded-lg border border-gray-100">
                    <div className="space-y-2">
                        <p className="font-bold text-gray-800 border-b border-gray-200 pb-1 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-primary-blue rounded-full"></span>
                            Example: Multiple Paragraphs
                        </p>
                        <div className="font-mono text-[10px] bg-white p-3 border border-border rounded-md space-y-1 leading-relaxed">
                            <p>This is paragraph one &lt;br&gt;</p>
                            <p>This is paragraph two &lt;br&gt;</p>
                            <p>For (') use &amp;#39; and (") use &amp;#34;</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="font-bold text-gray-800 border-b border-gray-200 pb-1 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-primary-blue rounded-full"></span>
                            Example: List Items
                        </p>
                        <div className="font-mono text-[10px] bg-white p-3 border border-border rounded-md space-y-1 leading-relaxed">
                            <p>&lt;ul&gt;</p>
                            <p className="ml-4">&lt;li&gt;First research highlight&lt;/li&gt;</p>
                            <p className="ml-4">&lt;li&gt;Second research highlight&lt;/li&gt;</p>
                            <p>&lt;/ul&gt;</p>
                        </div>
                    </div>
                </div>
            </FormSection>

            {/* Section 2: Insert Home Page Icons */}
            <FormSection
                title="Insert Home Page Icons"
                onSubmit={subIcon(onIconSubmit)}
                isSubmitting={isSubmittingIcon}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="block text-sm font-bold text-gray-700">
                            Icon Image <span className="text-gray-400 font-normal text-xs">(Optional if updating link)</span>
                        </label>
                        <input
                            {...regIcon('iconFile', { required: false })}
                            type="file"
                            accept="image/*"
                            className="w-full border border-border p-2 rounded-lg bg-white text-sm file:mr-4 file:py-1.5 file:px-4 file:rounded file:border-0 file:text-xs file:font-bold file:bg-primary-blue file:text-white hover:file:opacity-90 cursor-pointer"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-bold text-gray-700">
                            <span className="text-danger font-bold">*</span> Icon Link
                        </label>
                        <input
                            {...regIcon('iconLink', { required: true })}
                            type="text"
                            placeholder="https://example.com"
                            className="w-full border border-border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-all bg-white"
                        />
                    </div>
                </div>
            </FormSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Section 3: Update Home Page Marquee Text */}
                <FormSection
                    title="Marquee Text"
                    onSubmit={subMarquee(onMarqueeSubmit)}
                    isSubmitting={isSubmittingMarquee}
                >
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="block text-sm font-bold text-gray-700">
                                <span className="text-danger font-bold">*</span> Display Text
                            </label>
                            <input
                                {...regMarquee('marqueeText', { required: true })}
                                type="text"
                                placeholder="Latest updates scrolling..."
                                className="w-full border border-border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-all bg-white"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-sm font-bold text-gray-700">
                                <span className="text-danger font-bold">*</span> Redirect Link
                            </label>
                            <input
                                {...regMarquee('marqueeLink', { required: true })}
                                type="text"
                                placeholder="https://..."
                                className="w-full border border-border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-all bg-white"
                            />
                        </div>
                    </div>
                </FormSection>

                {/* Section 4: Update Impact Factor */}
                <FormSection
                    title="Impact Factor"
                    onSubmit={subImpact(onImpactSubmit)}
                    isSubmitting={isSubmittingImpact}
                >
                    <div className="space-y-6">
                        <div className="space-y-1">
                            <label className="block text-sm font-bold text-gray-700">
                                <span className="text-danger font-bold">*</span> Impact Ratio
                            </label>
                            <input
                                {...regImpact('impactFactor', { required: true })}
                                type="text"
                                placeholder="e.g. 5.12"
                                className="w-full border border-border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-all bg-white"
                            />
                        </div>
                        <p className="text-xs text-gray-400 italic bg-gray-50 p-3 rounded border border-gray-100">
                            This factor will be displayed on the journal's sidebar and public pages.
                        </p>
                    </div>
                </FormSection>
            </div>
        </div>
    );
};

export default HomeContent;