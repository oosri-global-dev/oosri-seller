import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyKyc, submitKyc } from "@/network/kyc";
import { message } from "antd";
import styled from "styled-components";
import {
  MdOutlineVerified as VerifiedIcon,
  MdOutlineHourglassTop as PendingIcon,
  MdOutlineCancel as RejectedIcon,
  MdOutlineUploadFile as UploadIcon,
  MdOutlineDescription as DocIcon,
  MdOutlineOpenInNew as ExternalIcon,
} from "react-icons/md";

const KycWrapper = styled.div`
  max-width: 740px;

  /* ── Page header ── */
  .page__header {
    margin-bottom: 28px;
    h2 { font-size: 1.2rem; font-weight: 700; color: #111827; margin: 0 0 4px; }
    p  { font-size: 0.84rem; color: #6b7280; margin: 0; }
  }

  /* ── Status hero card ── */
  .status__hero {
    border-radius: 14px;
    padding: 24px;
    margin-bottom: 24px;
    display: flex;
    align-items: flex-start;
    gap: 18px;

    &.pending  { background: #fffbeb; border: 1px solid #fde68a; }
    &.approved { background: #f0fdf4; border: 1px solid #bbf7d0; }
    &.rejected { background: #fef2f2; border: 1px solid #fecaca; }

    .status__icon {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 1.4rem;

      &.pending  { background: #fef9c3; color: #b45309; }
      &.approved { background: #dcfce7; color: #15803d; }
      &.rejected { background: #fee2e2; color: #b91c1c; }
    }

    .status__text {
      flex: 1;

      h3 {
        font-size: 1rem;
        font-weight: 700;
        margin: 0 0 5px;
        &.pending  { color: #92400e; }
        &.approved { color: #14532d; }
        &.rejected { color: #7f1d1d; }
      }

      p {
        font-size: 0.84rem;
        margin: 0;
        line-height: 1.55;
        &.pending  { color: #78350f; }
        &.approved { color: #166534; }
        &.rejected { color: #991b1b; }
      }
    }
  }

  /* ── Rejection reason ── */
  .rejection__card {
    background: #fff5f5;
    border: 1px solid #fecaca;
    border-radius: 12px;
    padding: 18px 20px;
    margin-bottom: 24px;

    .rejection__label {
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #dc2626;
      margin: 0 0 8px;
    }

    .rejection__text {
      font-size: 0.88rem;
      color: #991b1b;
      line-height: 1.55;
      margin: 0;
    }
  }

  /* ── Approved documents grid ── */
  .approved__docs {
    margin-bottom: 24px;

    .docs__heading {
      font-size: 0.78rem;
      font-weight: 700;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin: 0 0 14px;
    }

    .docs__grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;

      @media (max-width: 600px) { grid-template-columns: 1fr 1fr; }
    }
  }

  .doc__card {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    overflow: hidden;
    transition: box-shadow 0.15s;

    &:hover { box-shadow: 0 4px 14px rgba(0,0,0,0.08); }

    .doc__preview {
      height: 110px;
      background: #f9fafb;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #f0f0f0;
      position: relative;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .doc__pdf__icon {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        color: #9ca3af;
        font-size: 2rem;
      }

      .doc__overlay {
        position: absolute;
        inset: 0;
        background: rgba(0,0,0,0.35);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.15s;
      }

      &:hover .doc__overlay { opacity: 1; }
    }

    .doc__info {
      padding: 10px 12px;

      .doc__name {
        font-size: 0.78rem;
        font-weight: 600;
        color: #374151;
        margin: 0 0 3px;
      }

      .doc__status {
        font-size: 0.68rem;
        font-weight: 600;
        color: #16a34a;
        display: flex;
        align-items: center;
        gap: 3px;
      }
    }
  }

  /* ── Upload form card ── */
  .upload__card {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 14px;
    padding: 24px;
    margin-bottom: 20px;

    .upload__title {
      font-size: 0.95rem;
      font-weight: 700;
      color: #111827;
      margin: 0 0 4px;
    }

    .upload__desc {
      font-size: 0.8rem;
      color: #6b7280;
      margin: 0 0 20px;
    }
  }

  .upload__fields { display: flex; flex-direction: column; gap: 16px; }

  .upload__field {
    display: flex;
    flex-direction: column;
    gap: 6px;

    .field__label {
      font-size: 0.72rem;
      font-weight: 700;
      color: #374151;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      display: flex;
      align-items: center;
      gap: 5px;

      .required { color: var(--oosriPrimary); }
      .optional  { color: #9ca3af; font-weight: 400; text-transform: none; font-size: 0.72rem; }
    }

    .file__box {
      display: flex;
      align-items: center;
      gap: 12px;
      border: 1.5px dashed #d1d5db;
      border-radius: 10px;
      padding: 12px 16px;
      cursor: pointer;
      transition: border-color 0.15s, background 0.15s;
      background: #fafafa;

      &:hover          { border-color: var(--oosriPrimary); background: #fff; }
      &.has__file      { border-color: #16a34a; border-style: solid; background: #f0fdf4; }

      .file__icon__wrap {
        width: 36px;
        height: 36px;
        border-radius: 8px;
        background: #f5f5f5;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.1rem;
        flex-shrink: 0;
        color: #9ca3af;

        &.filled { background: #dcfce7; color: #16a34a; }
      }

      .file__info {
        flex: 1;
        .file__name { font-size: 0.84rem; color: #111827; font-weight: 500; }
        .file__hint { font-size: 0.72rem; color: #9ca3af; margin-top: 1px; }
      }

      input[type="file"] { display: none; }
    }

    .existing__url {
      font-size: 0.76rem;
      color: #6b7280;
      display: flex;
      align-items: center;
      gap: 5px;

      a {
        color: #1d4ed8;
        text-decoration: none;
        font-weight: 500;
        &:hover { text-decoration: underline; }
      }
    }
  }

  .submit__btn {
    height: 44px;
    padding: 0 32px;
    background: var(--oosriPrimary);
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: 700;
    cursor: pointer;
    font-family: inherit;
    transition: opacity 0.15s;
    display: flex;
    align-items: center;
    gap: 8px;

    &:hover    { opacity: 0.88; }
    &:disabled { opacity: 0.45; cursor: not-allowed; }
  }

  .skeleton {
    background: linear-gradient(90deg, #f5f5f5 25%, #ebebeb 50%, #f5f5f5 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
    border-radius: 12px;
    height: 100px;

    @keyframes shimmer {
      0%   { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  }
`;

const STATUS_CONFIG = {
  pending: {
    icon: PendingIcon,
    title: "Under Review",
    message: "Your documents are being reviewed by our team. This usually takes 1–3 business days. We'll notify you by email once complete.",
  },
  approved: {
    icon: VerifiedIcon,
    title: "Account Verified",
    message: "Your identity has been verified. You have full access to all seller features on Oosri.",
  },
  rejected: {
    icon: RejectedIcon,
    title: "Verification Declined",
    message: "Your submission was not approved. Please read the reason below and resubmit corrected documents.",
  },
};

const DOC_LABELS = {
  governmentId: "Government ID",
  proofOfAddress: "Proof of Address",
  businessCertificate: "Business Certificate",
};

function isPDF(url = "") {
  return url.toLowerCase().includes(".pdf") || url.toLowerCase().includes("application/pdf");
}

function DocCard({ label, url }) {
  if (!url) return null;
  return (
    <div className="doc__card">
      <a href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
        <div className="doc__preview">
          {isPDF(url) ? (
            <div className="doc__pdf__icon">
              <DocIcon size={32} />
              <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "#6b7280" }}>PDF</span>
            </div>
          ) : (
            <img src={url} alt={label} />
          )}
          <div className="doc__overlay">
            <ExternalIcon size={20} color="#fff" />
          </div>
        </div>
        <div className="doc__info">
          <p className="doc__name">{label}</p>
          <span className="doc__status">
            <VerifiedIcon size={11} /> Approved
          </span>
        </div>
      </a>
    </div>
  );
}

function FileField({ label, name, required, existingUrl, file, onChange }) {
  const ref = useRef();
  return (
    <div className="upload__field">
      <div className="field__label">
        {label}
        {required ? <span className="required">*</span> : <span className="optional">(optional)</span>}
      </div>
      <div className={`file__box ${file ? "has__file" : ""}`} onClick={() => ref.current.click()}>
        <div className={`file__icon__wrap ${file ? "filled" : ""}`}>
          {file ? <VerifiedIcon size={18} /> : <UploadIcon size={18} />}
        </div>
        <div className="file__info">
          <div className="file__name">{file ? file.name : "Click to upload a file"}</div>
          <div className="file__hint">JPEG, PNG or PDF · max 5 MB</div>
        </div>
        <input ref={ref} type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => onChange(e.target.files[0] || null)} />
      </div>
      {existingUrl && !file && (
        <div className="existing__url">
          <DocIcon size={13} />
          Currently uploaded:
          <a href={existingUrl} target="_blank" rel="noreferrer">View file ↗</a>
        </div>
      )}
    </div>
  );
}

export default function KycScreen() {
  const qc = useQueryClient();
  const { data: kycData, isLoading } = useQuery({
    queryKey: ["seller-kyc"],
    queryFn: getMyKyc,
  });
  const kyc = kycData?.data;

  const [govId, setGovId]     = useState(null);
  const [addr, setAddr]       = useState(null);
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
      qc.invalidateQueries({ queryKey: ["seller-kyc"] });
    },
    onError: (err) => message.error(err?.response?.data?.message || "Submission failed"),
  });

  const canSubmit = (govId || addr || bizCert) && kyc?.status !== "approved";
  const statusCfg = kyc ? STATUS_CONFIG[kyc.status] : null;
  const StatusIcon = statusCfg?.icon;

  const approvedDocs = kyc?.status === "approved" ? [
    { key: "governmentId",       label: DOC_LABELS.governmentId,       url: kyc?.documents?.governmentId },
    { key: "proofOfAddress",     label: DOC_LABELS.proofOfAddress,     url: kyc?.documents?.proofOfAddress },
    { key: "businessCertificate",label: DOC_LABELS.businessCertificate,url: kyc?.documents?.businessCertificate },
  ].filter((d) => d.url) : [];

  if (isLoading) {
    return (
      <KycWrapper>
        <div className="page__header">
          <h2>Identity Verification</h2>
          <p>Loading your verification status…</p>
        </div>
        <div className="skeleton" style={{ height: 110, marginBottom: 16 }} />
        <div className="skeleton" style={{ height: 200 }} />
      </KycWrapper>
    );
  }

  return (
    <KycWrapper>
      <div className="page__header">
        <h2>Identity Verification (KYC)</h2>
        <p>
          {kyc?.status === "approved"
            ? "Your account is fully verified. All submitted documents are shown below."
            : "Upload your identity documents to get verified. Verified sellers build more buyer trust."}
        </p>
      </div>

      {/* ── Status hero ── */}
      {kyc && statusCfg && (
        <div className={`status__hero ${kyc.status}`}>
          <div className={`status__icon ${kyc.status}`}>
            <StatusIcon size={22} />
          </div>
          <div className="status__text">
            <h3 className={kyc.status}>{statusCfg.title}</h3>
            <p className={kyc.status}>{statusCfg.message}</p>
          </div>
        </div>
      )}

      {/* ── Rejection reason ── */}
      {kyc?.status === "rejected" && kyc.rejectionReason && (
        <div className="rejection__card">
          <p className="rejection__label">Rejection Reason</p>
          <p className="rejection__text">{kyc.rejectionReason}</p>
        </div>
      )}

      {/* ── Approved documents ── */}
      {approvedDocs.length > 0 && (
        <div className="approved__docs">
          <p className="docs__heading">Submitted Documents</p>
          <div className="docs__grid">
            {approvedDocs.map((doc) => (
              <DocCard key={doc.key} label={doc.label} url={doc.url} />
            ))}
          </div>
        </div>
      )}

      {/* ── Upload form (not shown when approved) ── */}
      {kyc?.status !== "approved" && (
        <div className="upload__card">
          <p className="upload__title">{kyc ? "Update Your Documents" : "Submit Your Documents"}</p>
          <p className="upload__desc">
            {kyc
              ? "Replace any documents that need correction and resubmit for review."
              : "Upload clear, readable copies of the following documents to begin verification."}
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
              <UploadIcon size={16} />
              {mut.isPending ? "Submitting…" : kyc ? "Resubmit Documents" : "Submit for Verification"}
            </button>
          </div>
        </div>
      )}
    </KycWrapper>
  );
}
