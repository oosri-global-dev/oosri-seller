import React, { useState } from "react";
import styled from "styled-components";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchProductDiscussions,
  replyToDiscussion,
  pinDiscussion,
  deleteDiscussion,
} from "@/network/community";

const Panel = styled.div`
  width: 100%;
  margin-top: 32px;
  border-top: 1px solid rgba(187, 187, 187, 0.2);
  padding-top: 24px;

  h3 {
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0 0 16px;
  }

  .empty {
    font-size: 0.9rem;
    color: #888;
    padding: 20px 0;
  }
`;

const DiscussionRow = styled.div`
  padding: 16px 0;
  border-bottom: 1px solid rgba(187, 187, 187, 0.15);

  &:last-child { border-bottom: none; }

  .row__top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 8px;

    .author__info {
      display: flex;
      align-items: center;
      gap: 8px;

      .avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: #e5e7eb;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.72rem;
        font-weight: 700;
        color: #555;
        flex-shrink: 0;
      }

      .name {
        font-weight: 600;
        font-size: 0.88rem;
        margin: 0;
      }

      .verified { font-size: 0.7rem; color: #065f46; background: #d1fae5; padding: 2px 6px; border-radius: 4px; }
    }

    .row__actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;

      button {
        padding: 4px 12px;
        border-radius: 6px;
        font-size: 0.78rem;
        font-weight: 600;
        cursor: pointer;
        border: none;

        &.pin { background: #fef3c7; color: #92400e; }
        &.unpin { background: rgba(252,83,83,0.1); color: #fc5353; }
        &.del { background: #fee2e2; color: #991b1b; }
        &.reply__toggle { background: #dbeafe; color: #1e40af; }

        &:disabled { opacity: 0.5; cursor: not-allowed; }
      }
    }
  }

  .content {
    font-size: 0.88rem;
    color: #333;
    line-height: 1.5;
    margin: 0 0 10px 40px;
  }

  .reply__box {
    margin-left: 40px;
    margin-top: 10px;
    display: flex;
    gap: 8px;

    input {
      flex: 1;
      padding: 8px 12px;
      border: 1.5px solid rgba(187,187,187,0.4);
      border-radius: 8px;
      font-size: 0.85rem;
      outline: none;

      &:focus { border-color: #fc5353; }
    }

    button {
      padding: 8px 16px;
      background: #fc5353;
      color: #fff;
      border: none;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;

      &:disabled { opacity: 0.5; cursor: not-allowed; }
    }
  }
`;

function DiscussionItem({ discussion, productId }) {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const queryClient = useQueryClient();
  const key = ["seller-discussions", productId];

  const replyMut = useMutation({
    mutationFn: replyToDiscussion,
    onSuccess: () => { setReplyText(""); setShowReply(false); queryClient.invalidateQueries({ queryKey: key }); },
  });

  const pinMut = useMutation({
    mutationFn: pinDiscussion,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
  });

  const deleteMut = useMutation({
    mutationFn: deleteDiscussion,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
  });

  const authorLabel = discussion.authorType === "seller" ? "You (Seller)" : `Buyer${String(discussion.authorId).slice(-4)}`;

  return (
    <DiscussionRow>
      <div className="row__top">
        <div className="author__info">
          <div className="avatar">{(authorLabel[0] || "U").toUpperCase()}</div>
          <p className="name">{authorLabel}</p>
          {discussion.isVerifiedPurchase && <span className="verified">Verified</span>}
          {discussion.isPinned && <span style={{ fontSize: "0.72rem", color: "#6b7280" }}>📌 Pinned</span>}
        </div>

        <div className="row__actions">
          <button
            className={discussion.isPinned ? "unpin" : "pin"}
            onClick={() => pinMut.mutate(discussion._id)}
            disabled={pinMut.isPending}
          >
            {discussion.isPinned ? "Unpin" : "Pin"}
          </button>

          {discussion.authorType === "buyer" && (
            <button
              className="reply__toggle"
              onClick={() => setShowReply((v) => !v)}
            >
              {showReply ? "Cancel" : "Reply"}
            </button>
          )}

          <button
            className="del"
            onClick={() => deleteMut.mutate(discussion._id)}
            disabled={deleteMut.isPending}
          >
            Remove
          </button>
        </div>
      </div>

      <p className="content">{discussion.content}</p>

      {showReply && (
        <div className="reply__box">
          <input
            placeholder="Write your official response..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            maxLength={2000}
          />
          <button
            onClick={() => replyMut.mutate({ discussionId: discussion._id, content: replyText })}
            disabled={replyMut.isPending || !replyText.trim()}
          >
            {replyMut.isPending ? "Posting..." : "Reply"}
          </button>
        </div>
      )}
    </DiscussionRow>
  );
}

export default function ProductDiscussionsPanel({ productId }) {
  const { data, isLoading } = useQuery({
    queryKey: ["seller-discussions", productId],
    queryFn: () => fetchProductDiscussions({ productId }),
    enabled: !!productId,
    staleTime: 30_000,
  });

  const discussions = data?.data?.discussions || [];

  return (
    <Panel>
      <h3>Community Discussions ({discussions.length})</h3>

      {isLoading ? (
        <p className="empty">Loading discussions...</p>
      ) : discussions.length === 0 ? (
        <p className="empty">No discussions yet for this product.</p>
      ) : (
        discussions.map((d) => (
          <DiscussionItem key={d._id} discussion={d} productId={productId} />
        ))
      )}
    </Panel>
  );
}
