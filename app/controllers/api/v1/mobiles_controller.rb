class Api::V1::MobilesController < ApplicationController
    skip_before_action :verify_authenticity_token, only: [:destroy, :create, :update]
    
    def index
      @mobiles = Mobile.all
      render json: @mobiles
    end
  
    def show
      render json: @mobile
    end
    def create
      permitted_params = params.require(:mobile).permit(:model, :brand, :price, :spec)
      @mobile = Mobile.new(permitted_params)
  
      if @mobile.save
        render json: @mobile, status: :created
      else
        render json: @mobile.errors, status: :unprocessable_entity
      end
    end
  
    def update
      @mobile = Mobile.find(params[:id])

        if @mobile.update(mobile_params)
          render json: @mobile, status: :ok
        else
          render json: { error: @mobile.errors.full_messages }, status: :unprocessable_entity
      end
    end

      def destroy
        @mobile = Mobile.find(params[:id])
    
        if @mobile.destroy
          render json: { message: 'Mobile successfully deleted' }
        else

          render json: { error: 'Failed to delete mobile' }, status: :unprocessable_entity
        end
    
    end
    
  
    private

    def mobile_params
     params.require(:mobile).permit(:model, :brand, :price, :spec)
    end
end