class Api::V1::VotesController < ApplicationController
  def index
    items = Item.where(status: 0)
    render json: { status: 200, item: items }
  end

  def get_vote
    vote = Vote.find_by(item_id: vote_params[:item_id], user_id: vote_params[:user_id])
    if vote
      render json: { status: 200, vote: vote }
    else
      render json: { status: 500, message: 'vote not Found' }
    end
  end

  def show
    item = Item.find_by(id: params[:id])
    if item
      render json: { status: 200, item: item }
    else
      render json: { status: 500, message: 'Item not Found' }
    end
  end

  def create
    vote = Vote.new(vote_params)
    if vote.save
      render json: { status: 200, vote: vote }
    else
      render json: { status: 500, message: 'Failed' }
    end
  end

  private

  def vote_params
    params.permit(:id, :user_id, :item_id)
  end
end
