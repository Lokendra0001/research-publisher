"use client";
import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Upload,
  FileText,
  CheckCircle,
  Loader2,
  X,
  Plus,
  Trash2,
} from "lucide-react";
import axios from "axios";
import { constant } from "@/utils/constant";
import { notify } from "@/utils/toast";
import { useRouter } from "next/navigation";

const NewSubmission = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [numAuthors, setNumAuthors] = useState(1);
  const [showForm, setShowForm] = useState(false);

  // Setup form
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      category: "",
      coAuthors: [
        {
          name: "",
          membershipId: "",
          email: "",
          mobile: "",
          organization: "",
          country: "",
          pincode: "",
        },
      ],
      contactAuthor: "",
      contactEmail: "",
      contactMobile: "",
      keywords: "",
      abstract: "",
      experts: [
        { name: "", email: "", mobile: "", address: "" }, // Only 1 expert/reviewer by default
      ],
      comments: "",
      agreement: false,
    },
  });

  const router = useRouter();

  const { fields: authorFields, replace: replaceAuthors } = useFieldArray({
    control,
    name: "coAuthors",
  });

  const { fields: expertFields } = useFieldArray({
    control,
    name: "experts",
  });

  // Watch values for dynamic options
  const watchedAuthors = watch("coAuthors");

  // Handle Number of Authors Change
  const handleNumAuthorsChange = (e) => {
    const val = parseInt(e.target.value) || 0;
    setNumAuthors(val);
  };

  const handleEnterAuthors = () => {
    if (numAuthors > 0) {
      const currentLength = authorFields.length;
      // logic to resize array
      if (numAuthors > currentLength) {
        const diff = numAuthors - currentLength;
        const newAuthors = Array(diff).fill({
          name: "",
          membershipId: "",
          email: "",
          mobile: "",
          organization: "",
          country: "",
          pincode: "",
        });
        setValue("coAuthors", [...watchedAuthors, ...newAuthors]);
      } else if (numAuthors < currentLength) {
        setValue("coAuthors", watchedAuthors.slice(0, numAuthors));
      }
      setShowForm(true);
    } else {
      notify.error("Please enter a valid number of authors.");
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const onSubmit = async (data) => {
    if (!selectedFile) {
      notify.error("Please upload a manuscript file.");
      return;
    }
    if (!data.agreement) {
      notify.error("You must agree to the Terms of Service.");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();

      const payload = {
        title: data.title,
        abstract: data.abstract,
        keywords: data.keywords,
        category: data.category,
        researchType: "Original Research",
        coAuthors: JSON.stringify(data.coAuthors),
        suggestedReviewers: JSON.stringify(data.experts), // Sending the single expert as array
        comments: data.comments,
        contactAuthor: JSON.stringify({
          name: data.contactAuthor,
          email: data.contactEmail,
          mobile: data.contactMobile,
        }),
      };

      // Fix Keywords format from string to JSON array
      const keywordArray = data.keywords
        .split(",")
        .map((k) => k.trim())
        .filter((k) => k.length > 0);
      payload.keywords = JSON.stringify(keywordArray);

      for (let key in payload) {
        formData.append(key, payload[key]);
      }
      if (selectedFile instanceof File) {
        formData.append("manuscript", selectedFile);
      }

      const res = await axios.post(
        `${constant.SERVER_URL}papers/submit`,
        formData,
        { withCredentials: true },
      );

      if (res.data.success && constant.PAYMENT_SERVICE == "on") {
        const response = await axios.post(
          `${constant.SERVER_URL}payment`,
          res.data.data,
          { withCredentials: true },
        );
        document.open();
        document.write(response.data);
        document.close();
      } else if (res.data.success && constant.PAYMENT_SERVICE == "off") {
        router.push("/author/role?page=submitted_papers");
      } else {
        notify.error(res.data.message || "Submission failed");
      }
    } catch (error) {
      console.error(error);
      notify.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background p-2 md:p-6 shadow-sm rounded-lg border border-border">
      <div className="border-b border-border pb-4 mb-6">
        <h1 className="text-2xl font-bold text-primary-blue border-l-4 border-primary pl-3">
          New Submission
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Number of Authors */}
        <div className="bg-muted/50 p-4 rounded-md border border-border">
          <label className="block text-sm font-bold text-danger mb-1">
            * Enter number of total authors
          </label>
          <div className="flex gap-4 items-center">
            <input
              type="number"
              min="1"
              value={numAuthors}
              onChange={handleNumAuthorsChange}
              className="w-24 rounded border border-border px-3 py-1.5 focus:ring-1 focus:ring-ring"
            />
            <button
              type="button"
              onClick={handleEnterAuthors}
              className="bg-primary text-primary-foreground px-4 py-1.5 text-xs font-bold rounded uppercase shadow-sm hover:bg-primary-hover"
            >
              Enter
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Note: Click "Enter" to load the form fields for the specified number
            of authors.
          </p>
        </div>

        {showForm && (
          <>
            {/* General Information */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary/70 mb-3 border-b pb-1">
                General Information{" "}
                <span className="text-danger text-sm">(*Required)</span>
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-danger mb-1">
                    * Paper Title
                  </label>
                  <input
                    {...register("title", { required: "Title is required" })}
                    className="w-full rounded border border-border px-3 py-2 text-sm focus:ring-2 focus:ring-ring outline-none"
                  />
                  {errors.title && (
                    <span className="text-xs text-danger">
                      {errors.title.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-danger mb-1">
                    * Category
                  </label>
                  <select
                    {...register("category", {
                      required: "Category is required",
                    })}
                    className="w-full rounded border border-border px-3 py-2 text-sm focus:ring-2 focus:ring-ring outline-none"
                  >
                    <option value="">Select Category</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Medicine">Medicine</option>
                    <option value="Social Sciences">Social Sciences</option>
                    {/* Add more */}
                  </select>
                  {errors.category && (
                    <span className="text-xs text-danger">
                      {errors.category.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Author(s) Information */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary/70 mb-3 border-b pb-1">
                Author(s) Information{" "}
                <span className="text-danger text-sm">(*Required)</span>
              </h3>
              <div className="space-y-6">
                {authorFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="p-4 bg-muted/50 border border-border rounded-lg space-y-3"
                  >
                    <h4 className="font-semibold text-text-primary/70">
                      Author [{index + 1}]
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-danger mb-1">
                          * Author[{index + 1}] Name
                        </label>
                        <input
                          {...register(`coAuthors.${index}.name`, {
                            required: true,
                          })}
                          placeholder="Full Name"
                          className="w-full rounded border border-border px-2 py-1.5 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-text-primary/70 mb-1">
                          Membership ID (ISROSET/IEEE/ACM)
                        </label>
                        <input
                          {...register(`coAuthors.${index}.membershipId`)}
                          className="w-full rounded border border-border px-2 py-1.5 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-danger mb-1">
                          * Author[{index + 1}] Email
                        </label>
                        <input
                          {...register(`coAuthors.${index}.email`, {
                            required: true,
                          })}
                          className="w-full rounded border border-border px-2 py-1.5 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-danger mb-1">
                          * Author[{index + 1}] Mobile No.
                        </label>
                        <input
                          {...register(`coAuthors.${index}.mobile`, {
                            required: "Mobile is required",
                            pattern: {
                              value: /^[0-9]+$/,
                              message: "Only numbers allowed",
                            },
                            minLength: { value: 10, message: "Min 10 digits" },
                          })}
                          type="text"
                          maxLength={10}
                          onInput={(e) => {
                            e.target.value = e.target.value.replace(
                              /[^0-9]/g,
                              "",
                            );
                          }}
                          className="w-full rounded border border-border px-2 py-1.5 text-sm"
                        />
                        {errors.coAuthors?.[index]?.mobile && (
                          <span className="text-xs text-danger">
                            {errors.coAuthors[index].mobile.message}
                          </span>
                        )}
                      </div>
                      <div className="col-span-1 md:col-span-2">
                        <label className="block text-xs font-bold text-danger mb-1">
                          * Author[{index + 1}] Organization
                        </label>
                        <input
                          {...register(`coAuthors.${index}.organization`, {
                            required: true,
                          })}
                          className="w-full rounded border border-border px-2 py-1.5 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-danger mb-1">
                          * Author[{index + 1}] Country
                        </label>
                        <input
                          {...register(`coAuthors.${index}.country`, {
                            required: true,
                          })}
                          className="w-full rounded border border-border px-2 py-1.5 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-danger mb-1">
                          * Author[{index + 1}] Pin Code
                        </label>
                        <input
                          type="text"
                          {...register(`coAuthors.${index}.pincode`, {
                            required: "Pincode is required",
                            pattern: {
                              value: /^[0-9]+$/,
                              message: "Only numbers allowed",
                            },
                          })}
                          maxLength={6}
                          onInput={(e) => {
                            e.target.value = e.target.value.replace(
                              /[^0-9]/g,
                              "",
                            );
                          }}
                          className="w-full rounded border border-border px-2 py-1.5 text-sm"
                        />
                        {errors.coAuthors?.[index]?.pincode && (
                          <span className="text-xs text-danger">
                            {errors.coAuthors[index].pincode.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Author */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary/70 mb-3 border-b pb-1">
                Contact Author{" "}
                <span className="text-danger text-sm">(*Required)</span>
              </h3>
              <p className="text-xs text-muted-foreground mb-4 text-justify">
                The contact author is the person responsible for
                correspondence...
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-danger mb-1">
                    * Contact Author
                  </label>
                  <select
                    {...register("contactAuthor", { required: true })}
                    className="w-full rounded border border-border px-3 py-2 text-sm focus:ring-2 focus:ring-ring outline-none"
                  >
                    <option value="">Select Author</option>
                    {watchedAuthors.map((author, index) => (
                      <option key={index} value={author.name}>
                        {author.name || `Author ${index + 1}`}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-text-primary/70 mb-1">
                      Alternative Email
                    </label>
                    <input
                      {...register("contactEmail", {
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email",
                        },
                      })}
                      className="w-full rounded border border-border px-3 py-2 text-sm"
                    />
                    {errors.contactEmail && (
                      <span className="text-xs text-danger">
                        {errors.contactEmail.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-text-primary/70 mb-1">
                      Mobile No.
                    </label>
                    <input
                      {...register("contactMobile", {
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Only numbers allowed",
                        },
                        minLength: { value: 10, message: "Min 10 digits" },
                      })}
                      type="text"
                      maxLength={10}
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, "");
                      }}
                      className="w-full rounded border border-border px-3 py-2 text-sm"
                    />
                    {errors.contactMobile && (
                      <span className="text-xs text-danger">
                        {errors.contactMobile.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary/70 mb-3 border-b pb-1">
                Content <span className="text-danger text-sm">(*Required)</span>
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-danger mb-1">
                    * Keywords
                  </label>
                  <input
                    {...register("keywords", {
                      required: "Keywords are required",
                    })}
                    className="w-full rounded border border-border px-3 py-2 text-sm focus:ring-2 focus:ring-ring outline-none"
                    placeholder="Comma separated keywords"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-danger mb-1">
                    * Abstract
                  </label>
                  <textarea
                    rows={5}
                    {...register("abstract", {
                      required: "Abstract is required",
                      minLength: {
                        value: 50,
                        message: "Abstract must be at least 50 characters",
                      },
                    })}
                    className="w-full rounded border border-border px-3 py-2 text-sm focus:ring-2 focus:ring-ring outline-none resize-none"
                  />
                  {errors.abstract && (
                    <span className="text-xs text-danger">
                      {errors.abstract.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-danger mb-1">
                    * Attach Paper
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      accept=".doc,.docx,.pdf"
                      onChange={handleFileChange}
                      className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-warning/80  file:text-text-primary hover:file:bg-warning"
                    />
                  </div>
                  <p className="text-xs font-bold text-danger mt-1">
                    (*Word File Only)
                  </p>
                </div>
              </div>
            </div>

            {/* Reviewer / Expert */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary/70 mb-3 border-b pb-1">
                Nomination of Reviewer
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                You are required to nominate one expert/reviewer in the subject
                of your article.
              </p>
              <div className="space-y-6">
                {expertFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="p-4 bg-muted/50 border border-border rounded-lg space-y-3"
                  >
                    <h4 className="font-semibold text-text-primary/70">
                      Reviewer Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-text-primary/70 mb-1">
                          Full Name
                        </label>
                        <input
                          {...register(`experts.${index}.name`)}
                          className="w-full rounded border border-border px-2 py-1.5 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-text-primary/70 mb-1">
                          Email
                        </label>
                        <input
                          {...register(`experts.${index}.email`, {
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: "Invalid email",
                            },
                          })}
                          className="w-full rounded border border-border px-2 py-1.5 text-sm"
                        />
                        {errors.experts?.[index]?.email && (
                          <span className="text-xs text-danger">
                            {errors.experts[index].email.message}
                          </span>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-text-primary/70 mb-1">
                          Mobile No.
                        </label>
                        <input
                          {...register(`experts.${index}.mobile`, {
                            pattern: {
                              value: /^[0-9]+$/,
                              message: "Only numbers allowed",
                            },
                            minLength: { value: 10, message: " 10 digits" },
                          })}
                          type="text"
                          maxLength={10}
                          onInput={(e) => {
                            e.target.value = e.target.value.replace(
                              /[^0-9]/g,
                              "",
                            );
                          }}
                          className="w-full rounded border border-border px-2 py-1.5 text-sm"
                        />
                        {errors.experts?.[index]?.mobile && (
                          <span className="text-xs text-danger">
                            {errors.experts[index].mobile.message}
                          </span>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-text-primary/70 mb-1">
                          Address
                        </label>
                        <input
                          {...register(`experts.${index}.address`)}
                          className="w-full rounded border border-border px-2 py-1.5 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Comments */}
            <div>
              <label className="text-lg font-semibold text-text-primary/70 mb-3 block border-b pb-1">
                Additional Comments
              </label>
              <textarea
                rows={3}
                {...register("comments")}
                className="w-full rounded border border-border px-3 py-2 text-sm focus:ring-2 focus:ring-ring outline-none resize-none"
              />
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 pt-4 border-t">
              <input
                type="checkbox"
                {...register("agreement", { required: true })}
                className="mt-1 w-4 h-4 text-primary-blue rounded border-border focus:ring-ring"
              />
              <div className="text-sm text-text-primary/70">
                <span className="font-semibold">
                  I agree to the Terms of Services & Privacy Policy.
                </span>
                <p className="text-xs mt-1">
                  Please check over your entries...
                </p>
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-primary/90 hover:bg-primary cursor-pointer text-primary-foreground font-bold uppercase py-2 px-6 rounded shadow hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default NewSubmission;
