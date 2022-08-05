require "test_helper"

class Api::V1::VotesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_votes_index_url
    assert_response :success
  end
end
