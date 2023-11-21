import React from "react";

const Termsandcondition = ({ isOpen, isClose }) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm
    justify-center items-center z-50 top-50 flex overflow-auto "
    >
      <div className="overflow-y-scroll bg-white h-[70%] w-[80%] md:h-[70%] md:w-[80%] rounded-3xl  pb-6 px-5 md:px-14 shadow-2xl">
        <label className="font-bold mb-2">
          User Information Terms and Conditions
        </label>
        <div className="mb-2">
          <label className="font-bold">
            1. Collection of User Information{" "}
          </label>
          <p>
            {" "}
            By using the services of [Your Company Name] ("the Company"), you
            acknowledge and agree to the collection and use of your personal
            information as described in these User Information Terms and
            Conditions.
          </p>
        </div>
        <div className="mb-2">
          <label className="font-bold">2. Types of Information Collected</label>
          <p>
            The Company may collect various types of information, including but
            not limited to personal information (such as name, email address,
            and contact details) and non-personal information (such as
            demographic data and user preferences).
          </p>
        </div>
        <div className="mb-2">
          <label className="font-bold">3. Use of User Information</label>
          <p>
            The information collected may be used for purposes including, but
            not limited to, providing and improving services, personalizing user
            experience, processing transactions, and communicating with users.
          </p>
        </div>
        <div className="mb-2">
          <label className="font-bold">4. Data Security</label>
          <p>
            The Company takes reasonable measures to protect user information
            from unauthorized access, disclosure, alteration, or destruction.
            However, no method of transmission over the internet or electronic
            storage is 100% secure, and the Company cannot guarantee absolute
            security.
          </p>
        </div>
        <div className="mb-2">
          <label className="font-bold">5.Third-Party Disclosure</label>
          <p>
            {" "}
            The Company may share user information with third parties in the
            following circumstances: to provide services, to comply with legal
            obligations, to protect the rights and safety of the Company and its
            users, or with user consent.
          </p>
        </div>
        <div className="mb-2">
          <label className="font-bold">6. User Consent</label>
          <p>
            By providing personal information to the Company, you consent to the
            collection, use, and disclosure of that information as described in
            these User Information Terms and Conditions.
          </p>
        </div>
        <div className="mb-2">
          <label className="font-bold">7. User Rights</label>
          <p>
            Users have the right to request access to, correction of, or
            deletion of their personal information. Requests can be made by
            contacting [Your Contact Information].
          </p>
        </div>
        <div className="mb-2">
          <label className="font-bold">
            8. Cookies and Tracking Technologies
          </label>
          <p>
            The Company may use cookies and similar tracking technologies to
            enhance user experience. Users can control the use of cookies
            through their browser settings.
          </p>
        </div>
        <div className="mb-2">
          <label className="font-bold">
            9. Changes to User Information Terms
          </label>
          <p>
            The Company reserves the right to modify or replace these User
            Information Terms and Conditions at any time. Users will be notified
            of significant changes. Continued use of the services after such
            changes constitutes acceptance of the modified terms.
          </p>
        </div>
        <div className="mb-2">
          <label className="font-bold">10. Governing Law</label>
          <p>
            These User Information Terms and Conditions shall be governed by and
            construed in accordance with the laws of [your jurisdiction]. If you
            have any questions or concerns about these terms or the handling of
            user information, please contact [Your Contact Information].
          </p>
        </div>
        <div className="grid grid-cols-1 clas">
          <label>[Your Company Name]</label>
          <label>[Your Address]</label>
          <label>[Your Contact Information] </label>
          <label>[Date]</label>
        </div>
        <div className="mb-2">
          <p>
            Replace placeholders like [Your Company Name], [Your Address], and
            [Your Contact Information] with your actual business details.
            Customize the content to reflect your specific practices and comply
            with applicable data protection laws such as GDPR or CCPA. It's
            advisable to seek legal advice to ensure that your terms and
            conditions align with the laws relevant to your jurisdiction and
            industry.
          </p>
        </div>
        <button
          onClick={isClose}
          className="md:-mr-7  focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-8 py-4 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Termsandcondition;
