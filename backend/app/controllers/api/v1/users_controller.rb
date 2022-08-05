class Api::V1::UsersController < ApplicationController

  def index
    users = User.all
    render json: { status: 200, user: users }
  end

  def show
    user = User.find_by(id: params[:id])
    if user
      render json: { status: 200, user: user }
    else
      render json: { status: 500, message: "No User" }
    end
  end

  def create
    user = User.new(user_params)
    if user.save
      render json: { status: 200, user: user }
    else
      render json: { status: 500, message: "Userの作成に失敗しました" }
    end
  end

  def edit
    user = User.find_by(id: params[:id])
    render json: { status: 200, user: user }
  end

  def update
    user = User.find_by(id: params[:id])
    if user.update(user_params)
      render json: { status: 200, user: user }
    else
      render json: { status: 500, message: "Userの更新に失敗しました" }
    end
  end

  def destroy
    user = User.find_by(id: params[:id])
    if user.destroy
      render json: { status: 200, user: user }
    else
      render json: { status: 500, message: "Userの削除に失敗しました" }
    end
  end

  def get_user
    user = User.find_by(wallet_address: user_params[:wallet_address])
    if user
      session[:user_id] = user.id
      render json: { status: 200, user: user }
    else
      render json: { status: 500, message: "Userの取得に失敗しました" }
    end
  end

  private

  def user_params
    params.permit(:id, :email, :name, :wallet_address, :profile, :image)
  end
end
