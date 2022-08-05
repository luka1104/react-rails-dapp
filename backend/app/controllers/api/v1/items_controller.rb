class Api::V1::ItemsController < ApplicationController
  def index
    items = Item.where(status: 1)
    render json: { status: 200, item: items }
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
    item = Item.new(item_params)
    if item.save
      render json: { status: 200, item: item }
    else
      render json: { status: 500, message: "Item creation Failed" }
    end
  end

  def edit
    item = Item.find_by(id: params[:id])
    if item
      render json: { status: 200, item: item }
    else
      render json: { status: 500, message: 'Item not Found' }
    end
  end

  def update
    item = Item.find_by(id: params[:id])
    if item.update(item_params)
      render json: { status: 200, item: item }
    else
      render json: { status: 500, message: "Itemの更新に失敗しました" }
    end
  end

  def destroy
    item = Item.find_by(id: params[:id])
    if item.destroy
      render json: { status: 200, item: item }
    else
      render json: { status: 500, message: "Itemの削除に失敗しました" }
    end
  end

  private

  def item_params
    params.permit(:id, :name, :description, :image, :price, :url, :status, :user_id)
  end
end
