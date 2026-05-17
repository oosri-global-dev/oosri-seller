import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyKyc, submitKyc } from "@/network/kyc";
import { message } from "antd";
import styled from "styled-components";

const KycWrapper = styled.div`
  max-width: 720px;

  .page__header {
    margin-bottom: 24px;
    h2 { font-size: 1.2rem; font-weight: 700; color: #111827; margin: 0 0 4px; }
    p  { font-size: 0.84rem; color: #6b7280; margin: 0; }
  }

  .status__banner {
    border-radius: 10px;
    padding: 14px 18px;
    font-size: 0.87rem;
    font-weight: 600;
    margin-bottom: 20px;
    display: flex; align-items: center; gap: 10px;
    &.pending  { background: #fffbeb; color: #b45309; border: 1px solid #fde68a; }
    &.approved { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
    &.rejected { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }
  }

  .rejection__reason {
    background: #fef2f2; border: 1px solid #fecaca;
    border-radius: 8px; padding: 12px 16px;
    margin-bottom: 20px; font-size: 0.84rem; color: #991b1b;
    strong { display: block; margin-bottom: 4px; }
  }

  .upload__card {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 20px;

    .upload__title { font-size: 0.95rem; font-weight: 700; color: #111827; margin: 0 0 4px; }
    .upload__desc  { font-size: 0.78rem; color: #6b7280; margin: 0 0 16px; }
  }

  .upload__fields { display: flex; flex-direction: column; gap: 16px; }

  .upload__field {
    display: flex; flex-direction: column; gap: 6px;
    label {
      font-size: 0.78rem; font-weight: 600; color: #374151;
      text-transform: uppercase; letter-spacing: .04em;
      display: flex; align-items: center; gap: 6px;
      .required { color: var(--oosriPrimary); }
      .optional  { color: #9ca3af; font-weight: 400; text-transform: none; font-size: 0.72rem; }
    }
    .file__box {
      display: flex; align-items: center; gap: 10px;
      border: 1.5px dashed #d1d5db;
      border-radius: 8px; padding: 10px 14px;
      cursor: pointer; transition: border-color .15s;
      background: #fafafa;
      &:hover { border-color: var(--oosriPrimary); }
      &.has__file { border-color: #16a34a; background: #f0fdf4; }
      .file__icon { font-size: 1.2rem; }
      .file__info {
        flex: 1;
        .file__name { font-size: 0.82rem; color: #111827; font-weight: 500; }
        .file__hint { font-size: 0.72rem; color: #9ca3af; }
      }
      input[type="file"] { display: none; }
    }
    .existing__url {
      font-size: 0.76rem;
      a { color: #1d4ed8; text-decoration: none; &:hover { text-decoration: underline; } }
    }
  }

  .submit__btn {
    height: 42px; padding: 0 32px;
    background: var(--oosriPrimary); color: #fff;
    border: none; border-radius: 8px;
    font-size: 0.88rem; font-weight: 700;
    cursor: pointer; font-family: inherit;
    transition: opacity .15s;
    &:hover { opacity: 0.88; }
    &:disabled { opacity: 0.5; cursor: not-allowed; }
  }
`;

const STATUS_MSG = {
  pending:  "Your KYC documents are under review. We'll notify you by email once the review is complete.",
  approved: "Your account is fully verified! All documents have been approved.",
  rejected: "Your KYC was not approved. Please review the feedback below and resubmit your documents.",
};

function FileField({ label, name, required, existingUrl, file, onChange }) {
  const ref = useRef();
  return (
    <div className="upload__field">
      <label>
        {label}
        {required ? <span className="required">*</span> : <span className="optional">(optional)</span>}
      </label>
      <div className={`file__box ${file ? "has__file" : ""}`} onClick={() => ref.current.click()}>
        <span className="file__icon">{file ? "✅" : "📎"}</span>
        <div className="file__info">
          <div className="file__name">{file ? file.name : "Click to upload"}</div>
          <div className="file__hint">JPEG, PNG or PDF · max 5MB</div>
        </div>
        <input ref={ref} type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => onChange(e.target.files[0] || null)} />
      </div>
      {existingUrl && !file && (
        <div className="existing__url">
          Current: <a href={existingUrl} target="_blank" rel="noreferrer">View uploaded file ↗</a>
        </div>
      )}
    </div>
  );
}

export default function KycScreen() {
  const qc = useQueryClient();
  const { data: kycData, isLoading } = useQuery({
    queryKey: ['seller-kyc'],
    queryFn: getMyKyc,
  });
  const kyc = kycData?.data;

  const [govId, setGovId]   = useState(null);
  const [addr, setAddr]     = useState(null);
  const [bizCert, setBizCert] = useState(null);

  const mut = useMutation({
    mutationFn: () => {
      const fd = new FormData();
      if (govId)   fd.append("governmentId", govId);
      if (addr)    fd.append("proofOfAddress", addr);
      if (bizCert) fd.append("businessCertificate", bizCert);
      return submitKyc(fd);
    },
    onSuccess: () => {
      message.success("Documents submitted successfully");
      setGovId(null); setAddr(null); setBizCert(null);
      qc.invalidateQueries({ queryKey: ['seller-kyc'] });
    },
    onError: (err) => message.error(err?.response?.data?.message || "Submission failed"),
  });

  const canSubmit = (govId || addr || bizCert) && kyc?.status !== "approved";

  if (isLoading) return <KycWrapper><p style={{ color: "#6b7280" }}>Loading…</p></KycWrapper>;

  return (
    <KycWrapper>
      <div className="page__header">
        <h2>Identity Verification (KYC)</h2>
        <p>Upload your identity documents to get your account verified. Verified sellers build more buyer trust.</p>
      </div>

      {kyc && (
        <div className={`status__banner ${kyc.status}`}>
          {kyc.status === "pending"  && "⏳ "}
          {kyc.status === "approved" && "✅ "}
          {kyc.status === "rejected" && "❌ "}
          {STATUS_MSG[kyc.status]}
        </div>
      )}

      {kyc?.status === "rejected" && kyc.rejectionReason && (
        <div className="rejection__reason">
          <strong>Rejection Reason:</strong>
          {kyc.rejectionReason}
        </div>
      )}

      {kyc?.status !== "approved" && (
        <div className="upload__card">
          <p className="upload__title">{kyc ? "Update Documents" : "Submit Documents"}</p>
          <p className="upload__desc">
            {kyc
              ? "Replace any documents that were flagged and resubmit."
              : "Upload the following documents to begin your verification."}
          </p>
          <div className="upload__fields">
            <FileField
              label="Government-issued ID"
              name="governmentId"
              required
              existingUrl={kyc?.documents?.governmentId}
              file={govId}
              onChange={setGovId}
            />
            <FileField
              label="Proof of Address"
              name="proofOfAddress"
              required
              existingUrl={kyc?.documents?.proofOfAddress}
              file={addr}
              onChange={setAddr}
            />
            <FileField
              label="Business Certificate"
              name="businessCertificate"
              existingUrl={kyc?.documents?.businessCertificate}
              file={bizCert}
              onChange={setBizCert}
            />
          </div>
          <div style={{ marginTop: 24 }}>
            <button
              className="submit__btn"
              disabled={!canSubmit || mut.isPending}
              onClick={() => mut.mutate()}
            >
              {mut.isPending ? "Submitting…" : kyc ? "Resubmit Documents" : "Submit for Verification"}
            </button>
          </div>
        </div>
      )}
    </KycWrapper>
  );
}
